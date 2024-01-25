from django.shortcuts import render
from rest_framework.decorators import api_view, authentication_classes,permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.views import Response
import json
from apps.utils.emails import send_messages
from .models import Comments
from .serializers import CommentSerializers

# Create your views here.

def listOfComments():
    # obj = Comments.objects.all().order_by("created_at").depth(1)
    obj = Comments.objects.select_related("user").all().order_by("created_at")
    # obj = Comments.objects.select_related("user").values('_id', 'user_id').order_by("created_at")
    serializer = CommentSerializers(obj, many=True)
    return Response({"message":"Succeesfully fetched all comments", "comments":serializer.data,"success":"true","status":status.HTTP_200_OK})

@api_view(["GET"])
def comments(req):
    if req.method == "GET":
        return listOfComments()

@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def newComment(req):
    req.body = req.body.decode("utf-8")
    data = json.loads(req.body)
    data["user"] = req.user._id
    serializer = CommentSerializers(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message":"Your comment was succeesfully received", "success":"true","status":status.HTTP_200_OK})
    return Response({"message":"An error occured while submitting the comment", "success":"false", "status":status.HTTP_400_BAD_REQUEST})

@api_view(["POST"])
def transportMail(req):
    if req.method == "POST":
        req.body = req.body.decode("utf-8")
        data = json.loads(req.body)
        try:
            send_messages(data['fullname'], data['email'], data['msg'])
        except Exception as e:
            return Response({"message":"An error occured while sending message", "success":"false", "status":status.HTTP_400_BAD_REQUEST})
        return Response({"message":"email received succeesfully..We have send a confirmation", "success":"true","status":status.HTTP_200_OK})

@api_view(["GET"])
def test(req):
    return Response({"msg":"hello from contacts"})

