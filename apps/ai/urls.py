from django.urls import path

from .views import AutoTagAPIView, GenerateAPIView, SummaryAPIView

urlpatterns = [
    path("summary/", SummaryAPIView.as_view(), name="ai-summary"),
    path("generate/", GenerateAPIView.as_view(), name="ai-generate"),
    path("auto-tag/", AutoTagAPIView.as_view(), name="ai-auto-tag"),
]
