
from django.urls import re_path
from . import views

urlpatterns = [
    re_path("packages", views.packages),
    re_path("pkglist", views.listOfPackages)
]
