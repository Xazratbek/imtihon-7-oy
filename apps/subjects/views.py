from rest_framework import viewsets

from apps.accounts.permissions import IsAdminOrReadOnly

from .models import Subject
from .serializers import SubjectSerializer


class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = [IsAdminOrReadOnly]
    search_fields = ["name"]
