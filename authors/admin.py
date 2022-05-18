from django.contrib import admin

from authors.models import Authors
from users.models import User

admin.site.register(Authors)
admin.site.register(User)
# Register your models here.
