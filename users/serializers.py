from rest_framework.serializers import HyperlinkedModelSerializer
from .models import User


class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['nickname', 'first_name', 'last_name', 'age', 'email']


class UserModelSerializerAddFlags(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['nickname', 'first_name', 'last_name', 'age', 'email', 'is_superuser', 'is_staff']
