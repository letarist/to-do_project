# Generated by Django 4.0.3 on 2022-06-19 08:01

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('to_do_list', '0005_alter_project_directory_link'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='directory_link',
            field=models.URLField(default=uuid.UUID('11c07637-7fd4-4706-a27a-63431ea7a4e4'), verbose_name='Ссылка на директорию'),
        ),
    ]
