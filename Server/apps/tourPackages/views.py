from django.shortcuts import render
from rest_framework import status
from rest_framework.views import Response
from rest_framework.decorators import api_view, authentication_classes,permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from apps.utils.errorMsg import customErrorMessage
from .models import Packages
from .serializers import PackageSerializers
import os

# Create your views here.

def updatePackage(req, pkg):
    serializer = PackageSerializers(pkg, data=req.data, partial=True)
    if serializer.is_valid():
        if (req.data.get("packagePic")):
            prevImage = f"media/{pkg.packagePic}"
            try:
                os.remove(prevImage)
                print("image file deleted")
            except:
                print("an error occured")
        serializer.save()
        return Response({"message":"updated package successfully", "success":"true", "status":status.HTTP_200_OK})
    return Response({"message":customErrorMessage({"error": serializer.errors}), "success":"false", "status":status.HTTP_404_NOT_FOUND})

def deletePackage(req, pkg):
    prevImage = f"media/{pkg.packagePic}"
    try:
        os.remove(prevImage)
        print("image file deleted")
    except:
        print("an error occured")
    pkg.delete()
    return Response({"message":"Package successfully deleted", "success":"true","status":status.HTTP_200_OK})

def newPackage(req):
    serializer = PackageSerializers(data=req.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message":"Package successfully added to DB", "success":"true", "status":status.HTTP_200_OK})
    return Response({"message":customErrorMessage({"error": serializer.errors}), "success":"false", "status":status.HTTP_404_NOT_FOUND})

@api_view(["POST", "DELETE", "PATCH","GET"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, IsAdminUser])
def packages(req):
    if req.method == "POST":
        return newPackage(req)
    try:
        pkg = Packages.objects.get(_id=req.data["id"])
    except Packages.DoesNotExist:
        return Response({"message":"The requested package id matches none on the database", "success":"false", "status":status.HTTP_403_FORBIDDEN})
    if req.method == "DELETE":
        return deletePackage(req, pkg)
    elif req.method == "PATCH":
        return updatePackage(req, pkg)
    elif req.method == "GET":
        return Response({"user": req.user.username})

@api_view(["GET"])
def getSpecificPackage(req, title):
    pkg = Packages.objects.get(title=title);
    serializer = PackageSerializers(pkg)
    return Response({"message":"package details fetched", "package": serializer.data, "status":status.HTTP_200_OK})

@api_view(["GET"])
def listOfPackages(req):
    pkg = Packages.objects.all().order_by("created_at")
    serializer = PackageSerializers(pkg,many=True)
    return Response({"message":"a list of all packages", "packages": serializer.data, "status":status.HTTP_200_OK})
