# Generated by Django 4.2.6 on 2024-01-05 20:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Sites', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sites',
            name='dest_map',
            field=models.TextField(blank=True, max_length=2000, null=True),
        ),
    ]