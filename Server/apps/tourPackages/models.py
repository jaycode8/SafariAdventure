from uuid import uuid4
from django.db import models
import os
from datetime import datetime

# Create your models here.

def path_and_rename(instance,filename):
    upload_to = 'packages/'
    ext = filename.split(".")[-1]
    filename = 'pkg_{}.{}'.format(int(datetime.now().timestamp()), ext)
    return os.path.join(upload_to, filename)

class Packages(models.Model):
    _id = models.UUIDField(default=uuid4, primary_key=True, editable=False)
    title = models.CharField(max_length=200, unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.CharField(max_length=200)
    packagePic = models.ImageField(upload_to=path_and_rename)
    created_at = models.DateTimeField(auto_now_add=True)
