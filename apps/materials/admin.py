from django.contrib import admin

from .models import Material, Tag


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ["id", "name"]
    search_fields = ["name"]


@admin.register(Material)
class MaterialAdmin(admin.ModelAdmin):
    list_display = ["id", "title", "subject", "uploaded_by", "download_count", "created_at"]
    list_filter = ["subject", "tags"]
    search_fields = ["title", "description"]
    filter_horizontal = ["tags"]
