from django.contrib import admin

from .models import Rating


@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ["id", "user", "material", "type"]
    list_filter = ["type"]
