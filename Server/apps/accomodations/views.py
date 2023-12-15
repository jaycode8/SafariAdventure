from django.shortcuts import render
from rest_framework import status
from rest_framework.views import Response
from rest_framework.decorators import api_view, authentication_classes,permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from apps.utils.errorMsg import customErrorMessage
from .models import AccomodationType, Accomodations, ImageFiles
from .serializers import AccTypeSerializers, AccomodationSerializers
import os

# Create your views here.

#-------------------- accomodations views

def newAccomodation(req):
    serializer = AccomodationSerializers(data=req.data)
    if serializer.is_valid():
        files = req.FILES.getlist("files")
        file_list = []
        for file in files:
            new_file = ImageFiles(image = file)
            new_file.save()
            file_list.append(new_file.image.url)
        instance = serializer.save()
        instance.pictures = file_list
        instance.save()
        return Response({"message":"The accomodation was successfully added to DB", "success":"true", "status":status.HTTP_200_OK})
    return Response({"message":customErrorMessage({"error": serializer.errors}), "success":"false", "status":status.HTTP_404_NOT_FOUND})


@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, IsAdminUser])
def accomodations(req):
    if req.method == "POST":
        return newAccomodation(req)

@api_view(["GET"])
def specificAccomodation(req, id):
    obj = Accomodations.objects.get(_id=id)
    serializer = AccomodationSerializers(obj)
    return Response({"message":"Specific accomodation data", "accomodation": serializer.data, "status":status.HTTP_200_OK})

@api_view(["GET"])
def listOfAccomodations(req, id):
    obj = Accomodations.objects.select_related('acc_type').filter(acc_type=id).order_by("created_at")
    serializer = AccomodationSerializers(obj, many=True)
    objType = AccomodationType.objects.get(_id=id)
    print(objType.accomodationType)
    return Response({"message":"a list of all accomodations", "accomodation": serializer.data, "type":objType.accomodationType, "status":status.HTTP_200_OK})


#----------------- accomodation type views

def updateAccType(req, obj):
    serializer = AccTypeSerializers(obj, data=req.data, partial=True)
    if serializer.is_valid():
        if (req.data.get("accomodationPic")):
            prevImage = f"media/{obj.accomodationPic}"
            try:
                os.remove(prevImage)
                print("image file deleted")
            except:
                print("an error occured")
        serializer.save()
        return Response({"message":"updated accomodation type successfully", "success":"true", "status":status.HTTP_200_OK})
    return Response({"message":customErrorMessage({"error": serializer.errors}), "success":"false", "status":status.HTTP_404_NOT_FOUND})

def deleteAccType(req, obj):
    prevImage = f"media/{obj.accomodationPic}"
    try:
        os.remove(prevImage)
        print("image file deleted")
    except:
        print("an error occured")
    obj.delete()
    return Response({"message":"accomodation type deleted", "success":"true","status":status.HTTP_200_OK})

def newAccomodationType(req):
    serializer = AccTypeSerializers(data=req.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message":"Accomodation Type successfully added to DB", "success":"true", "status":status.HTTP_200_OK})
    return Response({"message":customErrorMessage({"error": serializer.errors}), "success":"false", "status":status.HTTP_404_NOT_FOUND})

@api_view(["POST", "DELETE", "PATCH"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, IsAdminUser])
def accomodationtypes(req):
    if req.method == "POST":
        return newAccomodationType(req)
    try:
        obj = AccomodationType.objects.get(_id=req.data["id"])
    except AccomodationType.DoesNotExist:
        return Response({"message":"The requested accomodation type id matches none on the database", "success":"false", "status":status.HTTP_403_FORBIDDEN})
    if req.method == "DELETE":
        return deleteAccType(req, obj)
    elif req.method == "PATCH":
        return updateAccType(req, obj)

@api_view(["GET"])
def listOfAccomodationTypes(req):
    obj = AccomodationType.objects.all().order_by("created_at")
    serializer = AccTypeSerializers(obj, many=True)
    return Response({"message":"a list of all accomodation types", "types": serializer.data, "status":status.HTTP_200_OK})

@api_view(["GET"])
def test(req, id):
    return Response({"msg":"hello from accomodations", "id":id})