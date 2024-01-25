
from rest_framework import serializers
from .models import Comments

class CommentSerializers(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = "__all__"
        depth = 1
