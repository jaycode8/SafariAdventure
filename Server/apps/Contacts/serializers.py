
from rest_framework import serializers
from .models import Comments
from apps.users.serializers import usersSerializer

class CommentSerializers(serializers.ModelSerializer):
    user = usersSerializer()
    class Meta:
        model = Comments
        fields = "__all__"

class CreateACommentSerializers(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = "__all__"
