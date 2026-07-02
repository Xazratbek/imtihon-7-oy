from django.db.models import Sum
from django.http import FileResponse
from django.shortcuts import get_object_or_404
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.ratings.models import Rating

from .filters import MaterialFilter
from .models import Material, Tag
from .permissions import IsOwnerOrReadOnly
from .serializers import DashboardSerializer, MaterialSerializer, TagSerializer


class MaterialListCreateAPIView(generics.ListCreateAPIView):
    queryset = Material.objects.with_counts()
    serializer_class = MaterialSerializer
    filterset_class = MaterialFilter
    search_fields = ["title", "description"]
    ordering_fields = ["created_at", "download_count", "like_count"]
    ordering = ["-created_at"]


class MaterialDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Material.objects.with_counts()
    serializer_class = MaterialSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]


class MaterialDownloadAPIView(APIView):
    @extend_schema(request=None, responses={200: OpenApiTypes.BINARY})
    def post(self, request, pk):
        material = get_object_or_404(Material, pk=pk)
        material.download_count += 1
        material.save(update_fields=["download_count"])
        return FileResponse(material.file.open("rb"), as_attachment=True, filename=material.file.name.split("/")[-1])


class TagListAPIView(generics.ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    search_fields = ["name"]
    pagination_class = None


class DashboardAPIView(APIView):
    @extend_schema(responses=DashboardSerializer)
    def get(self, request):
        user = request.user
        my_materials = Material.objects.filter(uploaded_by=user)

        data = {
            "my_materials_count": my_materials.count(),
            "my_total_downloads": my_materials.aggregate(total=Sum("download_count"))["total"] or 0,
            "my_likes_received": Rating.objects.filter(material__uploaded_by=user, type=Rating.LIKE).count(),
            "my_dislikes_received": Rating.objects.filter(material__uploaded_by=user, type=Rating.DISLIKE).count(),
            "top_popular_materials": MaterialSerializer(
                Material.objects.with_counts().order_by("-download_count")[:5],
                many=True, context={"request": request},
            ).data,
            "latest_materials": MaterialSerializer(
                Material.objects.with_counts().order_by("-created_at")[:10],
                many=True, context={"request": request},
            ).data,
        }
        return Response(data)
