import django_filters

from .models import Material


class MaterialFilter(django_filters.FilterSet):
    subject = django_filters.CharFilter(field_name="subject__name", lookup_expr="iexact")
    tag = django_filters.CharFilter(field_name="tags__name", lookup_expr="iexact")

    class Meta:
        model = Material
        fields = ["subject", "tag"]
