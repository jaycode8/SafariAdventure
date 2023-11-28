from django.shortcuts import render
from rest_framework import status
from rest_framework.views import Response
from rest_framework.decorators import api_view, authentication_classes,permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from apps.utils.errorMsg import customErrorMessage
from .models import Sites
from .serializers import SitesSerializer
import os
from apps.locations.models import Locations

# Create your views here.

def updateSite(req, obj):
    serializer = SitesSerializer(obj, data=req.data, partial=True)
    if serializer.is_valid():
        if (req.data.get("destinationPic")):
            prevImage = f"media/{obj.destinationPic}"
            try:
                os.remove(prevImage)
                print("image file deleted")
            except:
                print("an error occured")
        serializer.save()
        return Response({"message":"updated site successfull", "success":"true", "status":status.HTTP_200_OK})
    return Response({"message":customErrorMessage({"error": serializer.errors}), "success":"false", "status":status.HTTP_404_NOT_FOUND})

def deleteSite(req, obj):
    prevImage = f"media/{obj.DestinationPic}"
    try:
        os.remove(prevImage)
        print("image file deleted")
    except:
        print("an error occured")
    obj.delete()
    return Response({"message":"site was deleted succeddfully", "success":"true","status":status.HTTP_200_OK})

def newSite(req):
    serializer = SitesSerializer(data=req.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message":"The site was successfully added to DB", "success":"true", "status":status.HTTP_200_OK})
    return Response({"message":customErrorMessage({"error": serializer.errors}), "success":"false", "status":status.HTTP_404_NOT_FOUND})

@api_view(["POST", "DELETE", "PATCH"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, IsAdminUser])
def sites(req):
    if req.method == "POST":
        return newSite(req)
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
    obj1 = Sites.objects.select_related('destination_location').all().order_by("created_at")
    obj = Sites.objects.select_related('destination_location').filter(destination_location=id).order_by("created_at")
    serializer = SitesSerializer(obj, many=True)
    return Response({"message":"a list of all sites", "sites": serializer.data, "status":status.HTTP_200_OK})

@api_view(["GET"])
def specificSite(req,id):
    obj = Sites.objects.select_related('destination_location').filter(_id=id)
    serializer = SitesSerializer(obj, many=True)
    return Response({"message":"details of requested site", "site": serializer.data, "status":status.HTTP_200_OK})
