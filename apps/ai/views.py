from django.shortcuts import get_object_or_404
from drf_spectacular.utils import extend_schema
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.materials.models import Material

from .serializers import (
    AutoTagInputSerializer,
    AutoTagOutputSerializer,
    GenerateInputSerializer,
    GenerateOutputSerializer,
    SummaryInputSerializer,
    SummaryOutputSerializer,
)
from .utils import call_openrouter, extract_text


class SummaryAPIView(APIView):
    @extend_schema(request=SummaryInputSerializer, responses=SummaryOutputSerializer)
    def post(self, request):
        serializer = SummaryInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        material = get_object_or_404(Material, pk=serializer.validated_data["material"])

        text = extract_text(material.file)
        prompt = (
            "Quyidagi matn asosida qisqacha xulosa yoz. Javobni aynan shu formatda ber:\n"
            "Asosiy mavzu: ...\nMuhim tushunchalar: ...\nXulosa: ...\n\nMatn:\n" + text
        )
        summary = call_openrouter(prompt, system="Sen talabalar uchun konspekt qisqartiruvchi yordamchisan.")
        return Response({"material": material.id, "summary": summary})


class GenerateAPIView(APIView):
    @extend_schema(request=GenerateInputSerializer, responses=GenerateOutputSerializer)
    def post(self, request):
        serializer = GenerateInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        prompt = (
            f"Mavzu: {data['topic']}\nHujjat turi: {data['doc_type']}\nHajm: {data['size']}\n"
            + (f"Qo'shimcha talablar: {data['details']}\n" if data.get("details") else "")
            + "\nShu mavzu bo'yicha to'liq matn yoz (kirish, asosiy qism, xulosa bilan)."
        )
        content = call_openrouter(prompt, system="Sen talabalar uchun referat/konspekt yozuvchi yordamchisan.")
        return Response({"content": content})


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
        raw = call_openrouter(prompt, system="Sen material teglarini taklif qiluvchi yordamchisan.")
        tags = [t.strip().lower() for t in raw.replace("\n", ",").split(",") if t.strip()]
        return Response({"tags": tags[:5]})
