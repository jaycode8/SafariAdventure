from uuid import uuid4
from django.db import models
import os
from datetime import datetime

# Create your models here.

def path_and_rename(instance,filename):
    upload_to = 'accomodations/'
    ext = filename.split(".")[-1]
    filename = 'accomodation_{}.{}'.format(int(datetime.now().timestamp()), ext)
    return os.path.join(upload_to, filename)

class AccomodationType(models.Model):
    _id = models.UUIDField(default=uuid4, primary_key=True, editable=False)
    accomodationType = models.CharField(max_length=200, unique=True)
    accomodationPic = models.ImageField(upload_to=path_and_rename)
    created_at = models.DateTimeField(auto_now_add=True)


class Accomodations(models.Model):
    _id = models.UUIDField(default=uuid4, primary_key=True, editable=False)
    acc_name = models.CharField(max_length=200, unique=True)
    acc_location = models.CharField(max_length=200, blank=False, null=False)
    ammenities = models.CharField(max_length=200)
    description = models.CharField(max_length=200)
    pictures = models.JSONField(blank=True, null=True)
    acc_type = models.ForeignKey(AccomodationType,on_delete=models.CASCADE)
    acc_map = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

class ImageFiles(models.Model):
    _id = models.UUIDField(default=uuid4, primary_key=True, editable=False)
    image = models.FileField(upload_to=path_and_rename)
