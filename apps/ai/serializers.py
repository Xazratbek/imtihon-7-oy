from rest_framework import serializers


class SummaryInputSerializer(serializers.Serializer):
    material = serializers.IntegerField()


class GenerateInputSerializer(serializers.Serializer):
    DOC_TYPE_CHOICES = [("referat", "Referat"), ("konspekt", "Konspekt"), ("mustaqil_ish", "Mustaqil ish")]

    topic = serializers.CharField(max_length=255)
    doc_type = serializers.ChoiceField(choices=DOC_TYPE_CHOICES)
    size = serializers.CharField(max_length=50, help_text="masalan: 5 bet")
    details = serializers.CharField(allow_blank=True, required=False, help_text="qo'shimcha talablar (ixtiyoriy)")


class AutoTagInputSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=255)
    description = serializers.CharField(allow_blank=True, required=False)


class SummaryOutputSerializer(serializers.Serializer):
    material = serializers.IntegerField()
    summary = serializers.CharField()


class GenerateOutputSerializer(serializers.Serializer):
    content = serializers.CharField()


class AutoTagOutputSerializer(serializers.Serializer):
    tags = serializers.ListField(child=serializers.CharField())
