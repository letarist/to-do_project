import uuid
from django.db import models
from users.models import User


class Project(models.Model):
    title = models.CharField(verbose_name='Название', max_length=100)
    directory_link = models.URLField(verbose_name='Ссылка на директорию', default=uuid.uuid4())
    users = models.ManyToManyField(User)

    def __str__(self):
        return self.title


class ToDo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text_to_do = models.TextField(verbose_name='Содержание заметки')
    create_to_do = models.DateField(auto_now_add=True, verbose_name='Дата создания')
    update_to_do = models.DateField(auto_now=True, verbose_name='Дата обновления')
    users = models.ForeignKey(User, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True, verbose_name='Активный')

    def __str__(self):
        return self.text_to_do
