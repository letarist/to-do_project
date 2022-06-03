from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.generics import RetrieveAPIView
from rest_framework.renderers import JSONRenderer, CoreJSONRenderer
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.mixins import DestroyModelMixin
from rest_framework.viewsets import GenericViewSet
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import ProjectModelSerializer, ToDoModelSerializer
from .models import Project, ToDo
from .filters import ProjectFilter, ToDoFilter

HTTP_204_NO_CONTENT = 204


class ProjectPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectPagination
    filter_backends = (
        DjangoFilterBackend,)  # обязательно, иначе фильтрация не работает, даже если в файле настроек указано по умолчанию
    filterset_class = ProjectFilter


class ToDoPagination(LimitOffsetPagination):
    default_limit = 20


class ToDoViewSet(ModelViewSet):
    # renderer_classes = [JSONRenderer]  # обязательно указывать в списке
    # permission_classes = [AllowAny] # без ограничений на вьюху
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
    pagination_class = ToDoPagination
    filter_backends = (DjangoFilterBackend,)
    filterset_class = ToDoFilter

    def destroy(self, request, pk=None, *args, **kwargs):
        queryset = get_object_or_404(ToDo, pk=pk)
        serializer = ToDoModelSerializer(queryset)
        queryset.is_active = False
        queryset.save()
        return Response(serializer.data, status=HTTP_204_NO_CONTENT)

# class ListToDo(RetrieveAPIView):
#     queryset = ToDo.objects.all()
#     serializer_class = ToDoModelSerializer

# class DestroyToDo(ModelViewSet):
#     serializer_class = ToDoModelSerializer
#     queryset = ToDo.objects.all()
#
#     def destroy(self, request, *args, **kwargs):
#         queryset = self.get_object()
#         queryset.is_active = False
#         queryset.save()
#         return Response(status=204)
