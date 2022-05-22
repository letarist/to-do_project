from django.contrib import admin

from authors.models import Authors
from users.models import User
from to_do_list.models import Project,ToDo

admin.site.register(Authors)
admin.site.register(User)
admin.site.register(Project)
admin.site.register(ToDo)
# Register your models here.
