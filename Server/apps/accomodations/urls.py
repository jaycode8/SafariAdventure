

from django.urls import path, re_path
from . import views

urlpatterns = [
    re_path("types", views.accomodationtypes),
    re_path("typelists", views.listOfAccomodationTypes),
    re_path("acc", views.accomodations),
    re_path("all", views.allAccomodations),
    path("lists/<slug:id>", views.listOfAccomodations),
    path("specific/<slug:id>", views.specificAccomodation)
]
