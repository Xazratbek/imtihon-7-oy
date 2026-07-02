from django.conf import settings
from django.db import models

from apps.materials.models import Material


class AiGeneration(models.Model):
    SUMMARY = "summary"
    REFERAT = "referat"
    KIND_CHOICES = [(SUMMARY, "AI Xulosa"), (REFERAT, "AI Referat")]

    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"
    STATUS_CHOICES = [(PENDING, "Jarayonda"), (COMPLETED, "Tayyor"), (FAILED, "Xatolik")]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="ai_generations")
    kind = models.CharField(max_length=10, choices=KIND_CHOICES)
    title = models.CharField(max_length=255)
    material = models.ForeignKey(Material, on_delete=models.SET_NULL, null=True, blank=True, related_name="ai_generations")
    content = models.TextField(blank=True, default="")
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default=PENDING)
    is_public = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.get_kind_display()}: {self.title}"
