from rest_framework.viewsets import ModelViewSet
from .serializers import AuthorModelSerializer
from .models import Authors


class AuthorModelViewSet(ModelViewSet):
    queryset = Authors.objects.all()
    serializer_class = AuthorModelSerializer