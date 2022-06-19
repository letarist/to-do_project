"""todoproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import permissions
from rest_framework.routers import DefaultRouter
from authors.views import AuthorModelViewSet
from to_do_list.views import ProjectViewSet, ToDoViewSet
from users.views import UserModelViewSet
from rest_framework.authtoken import views
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema = get_schema_view(
    openapi.Info(
        title='to_do_project',
        default_version='1.0',
        description='I hate react)00)',
        contact=openapi.Contact(name='Дмитрий', email='pentegov_92@mail.ru'),
        license=openapi.License(name='NoFrontendCorp')
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

router = DefaultRouter()
router.register('authors', AuthorModelViewSet)
router.register('users', UserModelViewSet)
router.register('project', ProjectViewSet)
router.register('to_do', ToDoViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('autorization/', views.obtain_auth_token),
    # re_path(r'^api/(?P<version>\d\.\d)/users/$', UserModelViewSet.as_view({'get': 'list'})),
    path('api/user/1.0/', include("users.urls", namespace='1.0')),
    path('api/user/2.0/', include("users.urls", namespace='2.0')),
    # re_path(r'^swagger(?P<format>\.json|\.yaml)$',
    #         schema.without_ui)

    path('api/docs/', schema.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui', ),
    re_path('api/docs/swagger(?P<format>\.json|\.yaml)$', schema.without_ui(cache_timeout=0), name='json_format'),
    path('api/docs/redoc/', schema.with_ui('redoc', cache_timeout=0), name='schema-redoc-ui', ),
]
