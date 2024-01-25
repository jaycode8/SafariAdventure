from uuid import uuid4
from django.db import models
from apps.users.models import Users

# Create your models here.

class Comments(models.Model):
    _id = models.UUIDField(default=uuid4, primary_key=True, editable=False)
    comment = models.TextField()
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

