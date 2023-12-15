# Generated by Django 4.2.6 on 2023-11-24 07:18

import apps.accomodations.models
from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AccomodationType',
            fields=[
                ('_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('accomodationType', models.CharField(max_length=200, unique=True)),
                ('accomodationPic', models.ImageField(upload_to=apps.accomodations.models.path_and_rename)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]