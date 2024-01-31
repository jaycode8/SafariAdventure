from django.shortcuts import render
from rest_framework import status
from rest_framework.views import Response
from rest_framework.decorators import api_view, authentication_classes,permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from apps.utils.errorMsg import customErrorMessage
from .models import Locations
from .serializers import LocationSerializers
import os
from apps.Sites.models import Sites
from apps.Sites.views import deleteSite

# Create your views here.

def updateLocation(req, loc):
    serializer = LocationSerializers(loc, data=req.data, partial=True)
    if serializer.is_valid():
        if (req.data.get("locationPic")):
            prevImage = f"media/{loc.locationPic}"
            try:
                os.remove(prevImage)
                print("image file deleted")
            except:
                print("an error occured")
        serializer.save()
        return Response({"message":"updated location successfully", "success":"true", "status":status.HTTP_200_OK})
    return Response({"message":customErrorMessage({"error": serializer.errors}), "success":"false", "status":status.HTTP_404_NOT_FOUND})

def deleteLocation(req, loc, id):
    prevImage = f"media/{loc.locationPic}"
    try:
        os.remove(prevImage)
        print("image file deleted")
    except:
        print("an error occured")
    sites = Sites.objects.select_related('destination_location').filter(destination_location=id).order_by("created_at")
    for i in range(len(sites)):
        deleteSite(req, sites[i])
    loc.delete()
    return Response({"message":"location deleted", "success":"true","status":status.HTTP_200_OK})

def newLocation(req):
    serializer = LocationSerializers(data=req.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message":"location successfully added to DB", "success":"true", "status":status.HTTP_200_OK})
    return Response({"message":customErrorMessage({"error": serializer.errors}), "success":"false", "status":status.HTTP_404_NOT_FOUND})

@api_view(["POST", "DELETE", "PATCH","GET"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, IsAdminUser])
def location(req):
    if req.method == "POST":
        return newLocation(req)
    try:
        loc = Locations.objects.get(_id=req.data["id"])
    except Locations.DoesNotExist:
        return Response({"message":"The requested location id matches none on the database", "success":"false", "status":status.HTTP_403_FORBIDDEN})
    if req.method == "DELETE":
        return deleteLocation(req, loc, req.data["id"])
    elif req.method == "PATCH":
        return updateLocation(req, loc)
    elif req.method == "GET":
        return Response({"user": req.user.username})

@api_view(["GET"])
def listOfLocations(req):
    locations = Locations.objects.all().order_by("created_at")
    serializer = LocationSerializers(locations,many=True)
    return Response({"message":"a list of all locations", "locations": serializer.data, "status":status.HTTP_200_OK})

@api_view(["GET"])
def specificLocation(req, id):
    obj = Locations.objects.all().filter(_id=id)
    serializer = LocationSerializers(obj, many=True)
    return Response({"message":"fetched the specified location", "location": serializer.data, "status":status.HTTP_200_OK})

@api_view(["GET"])
def test(req):
    return Response({"msg":"hello from locations"})
