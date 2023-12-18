
from uuid import uuid4
from django.db import models
import os
from datetime import datetime
from apps.locations.models import Locations

# Create your models here.

def path_and_rename(instance,filename):
    upload_to = 'destinations/'
    ext = filename.split(".")[-1]
    filename = 'dest_{}.{}'.format(int(datetime.now().timestamp()), ext)
    return os.path.join(upload_to, filename)

class Sites(models.Model):
    _id = models.UUIDField(default=uuid4, primary_key=True, editable=False)
    destination_name = models.CharField(max_length=200, unique=True)
    destination_location = models.ForeignKey(Locations,on_delete=models.CASCADE)
    activities = models.CharField(max_length=200)
    description = models.CharField(max_length=200)
    pictures = models.JSONField(blank=True, null=True)
    dest_map = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Images(models.Model):
    _id = models.UUIDField(default=uuid4, primary_key=True, editable=False)
    image = models.FileField(upload_to=path_and_rename)
