from django.shortcuts import get_object_or_404
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.materials.models import Material

from .models import Rating
from .serializers import RatingInputSerializer, RatingOutputSerializer


class RatingAPIView(APIView):
    @extend_schema(request=RatingInputSerializer, responses=RatingOutputSerializer)
    def post(self, request):
        serializer = RatingInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        material = get_object_or_404(Material, pk=serializer.validated_data["material"])
        rating_type = serializer.validated_data["type"]

        rating, created = Rating.objects.get_or_create(
            user=request.user, material=material, defaults={"type": rating_type}
        )

        if not created and rating.type == rating_type:
            rating.delete()
            return Response({"detail": "reaction removed"}, status=status.HTTP_200_OK)

        if not created:
            rating.type = rating_type
            rating.save(update_fields=["type"])

        return Response({"material": material.id, "type": rating.type}, status=status.HTTP_200_OK)
