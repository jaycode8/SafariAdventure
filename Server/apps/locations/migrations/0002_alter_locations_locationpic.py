# Generated by Django 5.0.2 on 2024-04-16 13:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('locations', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='locations',
            name='locationPic',
            field=models.TextField(blank=True, null=True),
        ),
    ]
