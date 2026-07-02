from django.urls import path

from .views import (
    DashboardAPIView,
    MaterialDetailAPIView,
    MaterialDownloadAPIView,
    MaterialListCreateAPIView,
    TagListAPIView,
)

urlpatterns = [
    path("", MaterialListCreateAPIView.as_view(), name="material-list"),
    path("<int:pk>/", MaterialDetailAPIView.as_view(), name="material-detail"),
    path("<int:pk>/download/", MaterialDownloadAPIView.as_view(), name="material-download"),
    path("tags/", TagListAPIView.as_view(), name="tag-list"),
    path("dashboard/", DashboardAPIView.as_view(), name="dashboard"),
]
