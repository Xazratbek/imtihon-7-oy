from django.shortcuts import get_object_or_404
from drf_spectacular.utils import extend_schema
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .tasks import generate_response, generate_summary
from apps.materials.models import Material
from celery.result import AsyncResult
from .models import AiGeneration
from .permissions import IsOwnerOrReadOnly
from .serializers import *
from .utils import call_ai, extract_text
from rest_framework import status

class SummaryAPIView(APIView):
    @extend_schema(request=SummaryInputSerializer, responses=SummaryOutputSerializer)
    def post(self, request):
        serializer = SummaryInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        material = get_object_or_404(Material, pk=serializer.validated_data["material"])

        text = extract_text(material.file)
        generation = AiGeneration.objects.create(
            user=request.user, kind=AiGeneration.SUMMARY, title=material.title,
            material=material, status=AiGeneration.PENDING,
        )
        task = generate_summary.delay(text, generation.id)
        return Response({
            "task_id": task.id,
            "generation_id": generation.id,
            "message": "Sun'iy intellekt ishlov berishni boshladi",
        }, status=status.HTTP_202_ACCEPTED)


class GenerateAPIView(APIView):
    @extend_schema(request=GenerateInputSerializer, responses=GenerateOutputSerializer)
    def post(self, request):
        serializer = GenerateInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        generation = AiGeneration.objects.create(
            user=request.user, kind=AiGeneration.REFERAT, title=data["topic"], status=AiGeneration.PENDING,
        )
        task = generate_response.delay(data, generation.id)
        return Response({
            "task_id": task.id,
            "generation_id": generation.id,
            "message": "Sun'iy intellekt ishlov berishni boshladi",
        }, status=status.HTTP_202_ACCEPTED)


class AutoTagAPIView(APIView):
    @extend_schema(request=AutoTagInputSerializer, responses=AutoTagOutputSerializer)
    def post(self, request):
        serializer = AutoTagInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        prompt = (
            f"Sarlavha: {data['title']}\nTavsif: {data.get('description', '')}\n\n"
            "Shu material uchun 3 dan 5 tagacha teg taklif qil. Faqat vergul bilan ajratilgan "
            "kichik harfli so'zlar qaytar, boshqa hech narsa yozma."
        )
        raw = call_ai(prompt, system="Sen material teglarini taklif qiluvchi yordamchisan.")
        tags = [t.strip().lower() for t in raw.replace("\n", ",").split(",") if t.strip()]
        return Response({"tags": tags[:5]})


class AiHistoryListAPIView(generics.ListAPIView):
    serializer_class = AiGenerationSerializer

    def get_queryset(self):
        return AiGeneration.objects.filter(user=self.request.user)


class AiHistoryDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AiGenerationSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        return AiGeneration.objects.filter(user=self.request.user)


class AiPublicListAPIView(generics.ListAPIView):
    queryset = AiGeneration.objects.filter(is_public=True)
    serializer_class = AiGenerationSerializer
    search_fields = ["title"]
    filterset_fields = ["kind"]

class GetAITaskStatusView(APIView):
    def get(self, request, task_id):
        result = AsyncResult(task_id)

        if result.state == "SUCCESS":
            generation_id = result.result["id"]
            generation = get_object_or_404(AiGeneration, pk=generation_id)
            if generation.user_id != request.user.id:
                return Response(
                    {"state": "FAILURE", "message": "Birovning taskini ko'rish mumkin emas!"},
                    status=status.HTTP_403_FORBIDDEN,
                )
            return Response({"state": result.state, "result": result.result})

        elif result.state == "FAILURE":
            return Response(
                {"state": result.state, "message": "AI natijani qayta ishlashda xatolik yuz berdi.", "result": str(result.result)},
                status=status.HTTP_200_OK,
            )

        else:
            return Response(
                {"state": result.state, "message": "Natija hali tayyor emas."},
                status=status.HTTP_200_OK,
            )