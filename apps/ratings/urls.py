from django.urls import path

from .views import RatingAPIView

urlpatterns = [
    path("", RatingAPIView.as_view(), name="rating"),
]
