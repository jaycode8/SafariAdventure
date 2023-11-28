
from django.urls import re_path
from .import views

urlpatterns = [
    re_path("test", views.test),
    re_path("locations", views.location),
    re_path("locationlist", views.listOfLocations)
]
