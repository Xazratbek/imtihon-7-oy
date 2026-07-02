from rest_framework import serializers

from .models import Rating


class RatingInputSerializer(serializers.Serializer):
    material = serializers.IntegerField()
    type = serializers.ChoiceField(choices=Rating.TYPE_CHOICES)


class RatingOutputSerializer(serializers.Serializer):
    detail = serializers.CharField(required=False)
    material = serializers.IntegerField(required=False)
    type = serializers.ChoiceField(choices=Rating.TYPE_CHOICES, required=False)
