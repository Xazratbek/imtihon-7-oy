from django.conf import settings
from django.db import models

from apps.materials.models import Material


class Rating(models.Model):
    LIKE = "like"
    DISLIKE = "dislike"
    TYPE_CHOICES = [(LIKE, "Like"), (DISLIKE, "Dislike")]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="ratings")
    material = models.ForeignKey(Material, on_delete=models.CASCADE, related_name="ratings")
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)

    class Meta:
        unique_together = ["user", "material"]

    def __str__(self):
        return f"{self.user} - {self.material} - {self.type}"
