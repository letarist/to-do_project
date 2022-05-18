from django.db import models


class Authors(models.Model):
    first_name = models.CharField(verbose_name='Имя', max_length=50)
    last_name = models.CharField(verbose_name='Фамилия', max_length=70)
    birthday_year = models.PositiveSmallIntegerField(verbose_name='Год рождения')

    def __str__(self):
        return self.last_name
