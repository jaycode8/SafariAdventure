
from django.urls import re_path, path
from . import views

urlpatterns = [
    re_path("sites", views.sites),
    path("sitelists/<slug:id>", views.listOfSites),
    path("site/<slug:id>", views.specificSite)
]