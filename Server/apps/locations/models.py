from uuid import uuid4
from django.db import models
import os
from datetime import datetime

# Create your models here.

def path_and_rename(instance,filename):
    upload_to = 'locations/'
    ext = filename.split(".")[-1]
    filename = 'location_{}.{}'.format(int(datetime.now().timestamp()), ext)
    return os.path.join(upload_to, filename)

class Locations(models.Model):
    _id = models.UUIDField(default=uuid4, primary_key=True, editable=False)
    locationName = models.CharField(max_length=200, unique=True)
    locationPic = models.ImageField(upload_to=path_and_rename)
    created_at = models.DateTimeField(auto_now_add=True)
