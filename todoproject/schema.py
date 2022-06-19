from graphene_django import DjangoObjectType
import graphene
from to_do_list.models import Project, ToDo
from users.models import User


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = ('nickname', 'first_name', 'last_name')


class QuerySet(graphene.ObjectType):
    all_proj = graphene.List(ProjectType)
    all_to_do = graphene.List(ToDoType)
    all_users = graphene.List(UserType)
    user_by_name = graphene.Field(UserType, first_name=graphene.String())
    to_do_by_project = graphene.List(ToDoType, title=graphene.String(required=False))
    user_by_project = graphene.List(UserType, title=graphene.String())
    to_do_by_users = graphene.List(ToDoType, first_name=graphene.String())

    def resolve_to_do_by_users(self, info, first_name):
        todo = ToDo.objects.all()
        if first_name:
            todo = todo.filter(users__first_name=first_name)
        return todo

    def resolve_all_proj(self, info):
        return Project.objects.all()

    def resolve_all_todo(self, info):
        return ToDo.objects.all()

    def resolve_all_users(self, info):
        return User.objects.all()

    def resolve_user_by_name(self, info, first_name=None):
        try:
            return User.objects.get(first_name=first_name)
        except User.DoesNotExist:
            return None

    def resolve_to_do_by_project(self, info, title=None):
        to_do = ToDo.objects.all()
        if title:
            to_do = to_do.filter(project__title=title)
        return to_do

    def resolve_user_by_project(self, info, title=None):
        users = User.objects.all()
        if title:
            users = users.filter(project__title=title)
        return users


class UserMutation(graphene.Mutation):
    class Arguments:
        profession = graphene.String(required=False)
        id = graphene.ID()

    user = graphene.Field(UserType)

    @classmethod
    def mutate(cls, root, info, profession, id):
        user = User.objects.get(pk=id)
        user.profession = profession
        user.save()
        return UserMutation(user=user)


class Mutation(graphene.ObjectType):
    update_user = UserMutation.Field()


schema = graphene.Schema(query=QuerySet, mutation=Mutation)
