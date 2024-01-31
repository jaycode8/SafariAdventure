
from django.urls import re_path,path
from .import views

urlpatterns = [
    re_path("test", views.test),
    re_path("locations", views.location),
    re_path("locationlist", views.listOfLocations),
    path("loc/<slug:id>", views.specificLocation)
]
