from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from .serializers import SitesSerializer
from .models import Sites, Images
from rest_framework.decorators import api_view, authentication_classes,permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from apps.utils.errorMsg import customErrorMessage
import os

# Create your views here.
def updateSite(req, obj):
    serializer = SitesSerializer(obj, data=req.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        print("updated successfully")
        return Response({"message":"updated site successfull", "success":"true", "status":status.HTTP_200_OK})
    return Response({"message":customErrorMessage({"error": serializer.errors}), "success":"false", "status":status.HTTP_404_NOT_FOUND})


def deleteSite(req, obj):
    for img in obj.pictures:
        try:
            os.remove(img[1:])
            print("image file deleted")
        except:
            print("an error occured")
    obj.delete()
    return Response({"message":"site was deleted succeddfully", "success":"true","status":status.HTTP_200_OK})

def newSite(req):
    serializer = SitesSerializer(data=req.data)
    if serializer.is_valid():
        files = req.FILES.getlist("files")
        file_list = []
        for file in files:
            new_file = Images(image = file)
            new_file.save()
            file_list.append(new_file.image.url)
        instance = serializer.save()
        instance.pictures = file_list
        instance.save()
        return Response({"message":"The site was successfully added to DB", "success":"true", "status":status.HTTP_200_OK})
    return Response({"message":customErrorMessage({"error": serializer.errors}), "success":"false", "status":status.HTTP_404_NOT_FOUND})


@api_view(["GET", "POST", "DELETE", "PATCH"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, IsAdminUser])
def sites(req):
    if req.method == "POST":
        return newSite(req)
    elif req.method == "GET":
        obj = Sites.objects.select_related('destination_location').all().order_by("created_at")
        serializer = SitesSerializer(obj, many=True)
        return Response({"message":"a list of all sites", "sites": serializer.data, "status":status.HTTP_200_OK})
    try:
        obj = Sites.objects.get(_id=req.data["id"])
    except Sites.DoesNotExist:
        return Response({"message":"The requested site id matches none on the database", "success":"false", "status":status.HTTP_403_FORBIDDEN})
    if req.method == "DELETE":
        return deleteSite(req, obj)
    elif req.method == "PATCH":
        return updateSite(req, obj)


@api_view(["GET"])
def listOfSites(req, id):
    obj = Sites.objects.select_related('destination_location').filter(destination_location=id).order_by("created_at")
    serializer = SitesSerializer(obj, many=True)
    return Response({"message":"a list of all sites", "sites": serializer.data, "status":status.HTTP_200_OK})

@api_view(["GET"])
def specificSite(req,id):
    obj = Sites.objects.select_related('destination_location').filter(_id=id)
    serializer = SitesSerializer(obj, many=True)
    return Response({"message":"details of requested site", "site": serializer.data, "status":status.HTTP_200_OK})

@api_view(["GET"])
def allSites(req):
    obj = Sites.objects.all()
    serializer = SitesSerializer(obj, many=True)
    return Response({"message":"list of all sites", "sites": serializer.data, "status":status.HTTP_200_OK})

