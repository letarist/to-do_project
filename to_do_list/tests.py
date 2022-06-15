import traceback

from django.test import TestCase
from rest_framework.test import APIClient, APIRequestFactory, force_authenticate, APISimpleTestCase, APITestCase
import json
from mixer.backend.django import mixer
from django.conf import settings
from rest_framework import status
from django.contrib.auth.models import User
from .models import ToDo, Project
from users.models import User as Us
from .views import ToDoViewSet, ProjectViewSet
from users.views import UserModelViewSet


class TestTodo(TestCase):
    def test_todo_list(self):
        fabric = APIRequestFactory()
        request = fabric.get('/api/todo/')
        view = ToDoViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestMixerTODO(APITestCase):
    def test_edit_project(self):
        project = mixer.blend(Project)
        admin = User.objects.create_superuser(username='dimas', email='pentegov_92@mail.ru', password='DimaTeacher123')
        self.client.login(username='dimas', password='DimaTeacher123')
        response = self.client.patch(f'/api/project/{project.id}/', {'title': 'You pepega'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        proj = Project.objects.get(id=project.id)
        self.assertEqual(proj.title, 'You pepega')
        self.client.logout()


class TestUserApiClientUnauthorizide(APITestCase):
    def test_unautorizate(self):
        user = Us.objects.create(
            nickname='Bug', first_name='Franc', last_name='Kafka', age=40, email='castle@gmail.com',
            profession='writer')
        user1 = Us.objects.create(nickname='Ale', first_name='Alena', last_name='Zaiceva', age=19,
                                  email='email@mail.ru',
                                  profession='Gamer')
        project = Project.objects.create(title='Library', directory_link='tproger.ru')
        project.users.set((user, user1))
        client = APIClient()
        response = client.get(f'/api/project/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_todo(self):
        admin = User.objects.create_superuser(username='admin', email='asd@mail.ru', password='admin123456')
        self.client.login(username='admin', password='admin123456')

        user1 = Us.objects.create(nickname='Ale', first_name='Alena', last_name='Zaiceva', age=19,
                                  email='email@mail.ru',
                                  profession='Gamer')
        user2 = Us.objects.create(nickname='Dm', first_name='Dmitry', last_name='Zaicev', age=12,
                                  email='email1@mail.ru',
                                  profession='Gamer')
        project = Project.objects.create(title='Name', directory_link='tproger.ru')
        project.users.set((user1, user2))
        todo = ToDo.objects.create(project=project, text_to_do='asd',
                                   create_to_do='2022-06-12', update_to_do='2022-06-14', users=(user1),
                                   is_active=True)

        response = self.client.patch(f'/api/to_do/{todo.id}/', {'text_to_do': 'Arnold'})
        self.assertNotEqual(todo.text_to_do, 'Arnold')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.client.logout()


class TestMath(APITestCase):
    def test_sqrt(self):
        import math
        self.assertEqual(math.sqrt(144), 12)
