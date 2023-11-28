

from django.urls import re_path
from . import views

urlpatterns = [
    re_path("types", views.accomodationtypes),
    re_path("typelists", views.listOfAccomodationTypes)
]
