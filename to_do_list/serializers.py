from rest_framework.serializers import HyperlinkedModelSerializer, StringRelatedField
from .models import Project, ToDo
from users.serializers import UserModelSerializer


class ProjectModelSerializer(HyperlinkedModelSerializer):
    users = UserModelSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(HyperlinkedModelSerializer):
    # users = StringRelatedField()  # опционально
    # project = ProjectModelSerializer()  # опционально

    class Meta:
        model = ToDo
        fields = '__all__'