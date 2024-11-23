# Generated by Django 5.1.3 on 2024-11-23 04:01

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Users',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=100)),
                ('password', models.CharField(max_length=100)),
                ('email', models.CharField(max_length=100)),
            ],
        ),
        migrations.AddField(
            model_name='restaurants',
            name='cost',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='restaurants',
            name='rating',
            field=models.DecimalField(decimal_places=1, default=0, max_digits=3),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name='Foods',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('resto_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.restaurants')),
            ],
        ),
        migrations.CreateModel(
            name='Maps',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('listname', models.CharField(max_length=100)),
                ('restos', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.restaurants')),
            ],
        ),
    ]