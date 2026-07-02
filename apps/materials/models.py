from django.conf import settings
from django.db import models
from django.db.models import Count, Q

from apps.subjects.models import Subject


class MaterialQuerySet(models.QuerySet):
    def with_counts(self):
        from apps.ratings.models import Rating

        return self.annotate(
            like_count=Count("ratings", filter=Q(ratings__type=Rating.LIKE)),
            dislike_count=Count("ratings", filter=Q(ratings__type=Rating.DISLIKE)),
        )


class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class Material(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    file = models.FileField(upload_to="materials/%Y/%m/")
    cover_image = models.ImageField(upload_to="covers/%Y/%m/", blank=True, null=True)
    uploaded_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="materials"
    )
    subject = models.ForeignKey(Subject, on_delete=models.PROTECT, related_name="materials")
    tags = models.ManyToManyField(Tag, related_name="materials", blank=True)
    download_count = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    objects = MaterialQuerySet.as_manager()

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title
