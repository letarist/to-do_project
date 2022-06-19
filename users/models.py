from django.db import models


class User(models.Model):
    nickname = models.CharField(max_length=30, default='Pepega')
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=70)
    age = models.PositiveSmallIntegerField()
    email = models.CharField(max_length=70, unique=True, blank=True)
    profession = models.CharField(max_length=50)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    def __str__(self):
        return self.last_name
