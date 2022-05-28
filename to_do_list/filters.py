from django_filters import rest_framework
from .models import Project, ToDo


class ProjectFilter(rest_framework.FilterSet):
    title = rest_framework.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Project
        fields = ['title', ]


class ToDoFilter(rest_framework.FilterSet):
    project = rest_framework.CharFilter(field_name='project__title', lookup_expr='iexact')
    # отрабатывает при полном совпадении, field_name - поле в связанной таблице
    create = rest_framework.DateFromToRangeFilter()  # Не получилось реализовать. URL http://127.0.0.1:8000/api/to_do/?creare_to_do_min=2022-05-22&create_to_do_max=2022-05-27
    # Должен показывать все, кроме последней записи

    class Meta:
        model = ToDo
        fields = ['project', 'create_to_do']
