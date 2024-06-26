# Generated by Django 5.0.2 on 2024-03-18 21:17

import apps.Sites.models
import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('locations', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Images',
            fields=[
                ('_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('image', models.FileField(upload_to=apps.Sites.models.path_and_rename)),
            ],
        ),
        migrations.CreateModel(
            name='Sites',
            fields=[
                ('_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('destination_name', models.CharField(max_length=200, unique=True)),
                ('activities', models.TextField()),
                ('description', models.TextField()),
                ('pictures', models.JSONField(blank=True, null=True)),
                ('dest_map', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('destination_location', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='locations.locations')),
            ],
        ),
    ]
