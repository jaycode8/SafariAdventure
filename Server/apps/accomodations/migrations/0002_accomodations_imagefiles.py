# Generated by Django 4.2.6 on 2023-12-09 09:18

import apps.accomodations.models
from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('accomodations', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Accomodations',
            fields=[
                ('_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('acc_name', models.CharField(max_length=200, unique=True)),
                ('acc_location', models.CharField(max_length=200)),
                ('ammenities', models.CharField(max_length=200)),
                ('description', models.CharField(max_length=200)),
                ('pictures', models.JSONField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='ImageFiles',
            fields=[
                ('_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('image', models.FileField(upload_to=apps.accomodations.models.path_and_rename)),
            ],
        ),
    ]