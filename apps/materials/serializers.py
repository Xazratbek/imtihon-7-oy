from rest_framework import serializers

from .models import Material, Tag


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "name"]


class MaterialSerializer(serializers.ModelSerializer):
    tags = serializers.ListField(child=serializers.CharField(), write_only=True, required=False)
    tag_list = TagSerializer(source="tags", many=True, read_only=True)
    uploaded_by = serializers.StringRelatedField(read_only=True)
    subject_name = serializers.CharField(source="subject.name", read_only=True)
    like_count = serializers.IntegerField(read_only=True, default=0)
    dislike_count = serializers.IntegerField(read_only=True, default=0)

    class Meta:
        model = Material
        fields = [
            "id", "title", "description", "file", "cover_image", "subject", "subject_name",
            "tags", "tag_list", "uploaded_by", "download_count",
            "like_count", "dislike_count", "created_at",
        ]
        read_only_fields = ["download_count", "uploaded_by", "created_at"]

    def create(self, validated_data):
        tag_names = validated_data.pop("tags", [])
        material = Material.objects.create(
            uploaded_by=self.context["request"].user, **validated_data
        )
        self._set_tags(material, tag_names)
        return material

    def update(self, instance, validated_data):
        tag_names = validated_data.pop("tags", None)
        instance = super().update(instance, validated_data)
        if tag_names is not None:
            self._set_tags(instance, tag_names)
        return instance

    def _set_tags(self, material, tag_names):
        if not tag_names:
            return
        tags = [Tag.objects.get_or_create(name=name.strip().lower())[0] for name in tag_names]
        material.tags.set(tags)


class DashboardSerializer(serializers.Serializer):
    my_materials_count = serializers.IntegerField()
    my_total_downloads = serializers.IntegerField()
    my_likes_received = serializers.IntegerField()
    my_dislikes_received = serializers.IntegerField()
    top_popular_materials = MaterialSerializer(many=True)
    latest_materials = MaterialSerializer(many=True)
