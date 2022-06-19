from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin
from rest_framework.pagination import PageNumberPagination
from rest_framework import versioning
from rest_framework.viewsets import GenericViewSet
from .serializers import UserModelSerializer, UserModelSerializerAddFlags
from .models import User


class UserModelViewSet(ListModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    pagination_class = PageNumberPagination
    versioning_class = versioning.NamespaceVersioning  # БЕЗ ЭТОГО НЕ РАБОТАЛО

    def get_serializer_class(self):
        print(self.request.version)
        if self.request.version == '1.0':
            return UserModelSerializer
        return UserModelSerializerAddFlags
