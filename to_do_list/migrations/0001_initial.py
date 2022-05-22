# Generated by Django 4.0.4 on 2022-05-22 09:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100, verbose_name='Название')),
                ('users', models.ManyToManyField(to='users.user')),
            ],
        ),
        migrations.CreateModel(
            name='ToDo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text_to_do', models.TextField(verbose_name='Содержание заметки')),
                ('create_to_do', models.DateField(auto_now_add=True, verbose_name='Дата создания')),
                ('update_to_do', models.DateField(auto_now=True, verbose_name='Дата обновления')),
                ('is_active', models.BooleanField(default=True, verbose_name='Активный')),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='to_do_list.project')),
                ('users', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.user')),
            ],
        ),
    ]