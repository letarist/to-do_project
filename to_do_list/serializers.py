from rest_framework.serializers import HyperlinkedModelSerializer, StringRelatedField, ModelSerializer
from .models import Project, ToDo
from users.serializers import UserModelSerializer


class ProjectModelSerializer(ModelSerializer):
    # users = StringRelatedField(many=True)
    # users = StringRelatedField()

    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(HyperlinkedModelSerializer):
    # users = StringRelatedField()  # опционально
    # project = StringRelatedField()  # опционально

    class Meta:
        model = ToDo
        fields = '__all__'
