from django.contrib import admin

from .models import AiGeneration


@admin.register(AiGeneration)
class AiGenerationAdmin(admin.ModelAdmin):
    list_display = ["id", "kind", "title", "user", "is_public", "created_at"]
    list_filter = ["kind", "is_public"]
    search_fields = ["title", "user__email"]
