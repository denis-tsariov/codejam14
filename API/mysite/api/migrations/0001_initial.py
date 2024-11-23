# Generated by Django 5.1.3 on 2024-11-23 23:13

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Restaurants',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('location', models.JSONField()),
                ('cost', models.IntegerField(choices=[(0, 'Free'), (1, 'Cheap'), (2, 'Moderate'), (3, 'Expensive'), (4, 'Very Expensive')])),
                ('rating', models.DecimalField(decimal_places=1, max_digits=3)),
                ('food_array', models.JSONField(blank=True, default=list)),
            ],
        ),
        migrations.CreateModel(
            name='Maps',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('listname', models.CharField(max_length=100)),
                ('image_link', models.CharField(blank=True, max_length=100)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('restos', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.restaurants')),
            ],
        ),
    ]
