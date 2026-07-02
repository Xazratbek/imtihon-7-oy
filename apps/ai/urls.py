from django.urls import path
from .views import *

urlpatterns = [
    path("summary/", SummaryAPIView.as_view(), name="ai-summary"),
    path("generate/", GenerateAPIView.as_view(), name="ai-generate"),
    path("auto-tag/", AutoTagAPIView.as_view(), name="ai-auto-tag"),
    path("history/", AiHistoryListAPIView.as_view(), name="ai-history"),
    path("history/<int:pk>/", AiHistoryDetailAPIView.as_view(), name="ai-history-detail"),
    path("public/", AiPublicListAPIView.as_view(), name="ai-public"),
    path("tasks/<str:task_id>/", GetAITaskStatusView.as_view(), name="ai-task-status"),
]
