
from pathlib import Path
from random import randint
from datetime import datetime
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authtoken.models import Token, os
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from .serializers import usersSerializer
from .models import Users
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.conf import settings

# Create your views here.
def customErrorMessage(error_data):
    error_messages = error_data.get("error", {})
    error_message = None
    for field, messages in error_messages.items():
        if messages:
            error_message = messages[0]
        return error_message
        break

def modifyUser(req, obj):
    serializer = usersSerializer(obj, data=req.data, partial=True)
    if serializer.is_valid():
        # if req.data.get('profile'):
        #     a = serializer.data['profile']
        #     previousImg = f'../..{a}'
        #     if os.path.exists(previousImg):
        #         os.remove(serializer.data['profile'])
        #         print("image deleted")
        #     else:
        #         print(f'file not found {previousImg}')
        # else:
        #     print("none")
        serializer.save()
        return Response({"message": "Successfully updated your account infor","data":serializer.data, "success": "true"})
    return Response({"message": customErrorMessage({"error": serializer.errors}), "success": "false"})


def listOfUsers():
    user = Users.objects.all().exclude(is_superuser=True)
    serializer = usersSerializer(user, many=True)
    return Response({"message": "list of all users", "data": serializer.data, "status": status.HTTP_200_OK})


def signIn(req):
    user = req.data
    try:
        usr = get_object_or_404(Users, username=user['uname'])
    except:
        return Response({"message": "Username does not exist", "success": "false", "status": status.HTTP_400_BAD_REQUEST})
    if not usr.is_active:
        return Response({"message": "Account does not exist", "success": "false", "status": status.HTTP_400_BAD_REQUEST})
    found_user = authenticate(username=user['uname'], password=user['passw'])
    print(usr.password)
    if not found_user:
        return Response({"message": "The password is incorect", "success": "false", "status": status.HTTP_400_BAD_REQUEST})

    if usr.is_superuser:
        return Response({"message": "admin logged in"})
    token, _ = Token.objects.get_or_create(user=usr)
    token.created = datetime.now()
    token.save()
    serializer = usersSerializer(instance=usr)
    return Response({"message": "Successfully loged into your account", "user":serializer.data, "success": "true", "token": token.key, "status": status.HTTP_200_OK})

def SignUp(req):
    serializer = usersSerializer(data=req.data)
    global OTP
    global username
    if serializer.is_valid():
        serializer.save()
        OTP = randint(1000, 9999)
        username = serializer.data["username"]
        # transporter(serializer.data["email"], OTP)
        print(OTP)
        return Response({"message": "An OTP verification code has been sent to your email", "success": "true", "status": status.HTTP_200_OK, "OTP": OTP})
    return Response({"message": customErrorMessage({"error": serializer.errors}), "success": "false", "status": status.HTTP_400_BAD_REQUEST})


def verifyOTP(req):
    global OTP
    global username
    if OTP == int(req.data["otp"]):
        instance = Users.objects.get(username=username)
        instance.is_active = True
        instance.save()
        return Response({"message": "User successfully added to the system", "success": "true", "status": status.HTTP_200_OK})
    return Response({"message": "Incorrect Code", "success": "false", "status": status.HTTP_400_BAD_REQUEST})


@api_view(["GET", "PATCH"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def user_route(req):
    user_data = usersSerializer(instance=req.user)
    user_obj = Users.objects.get(_id=req.user._id)
    if req.method == "GET":
        return Response({"message": f"{req.user}'s data Successfully fetched", "success": "true", "user": user_data.data, "status": status.HTTP_200_OK})
    
    elif req.method == "PATCH":
        print(req.data)
        return modifyUser(req, user_obj)


@api_view(["POST"])
def signin_view(req):
    if req.method == "POST":
        return signIn(req)

@api_view(["POST"])
def verification(req):
    return verifyOTP(req)

@api_view(["POST"])
def signup_view(req):
    if req.method == "POST":
        return SignUp(req)

@api_view(['GET', "POST"])
def test_route(req):
    if req.method == "GET":
        return listOfUsers()
    return Response({"message":"hi"})

