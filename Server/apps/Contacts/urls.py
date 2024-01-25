
from django.urls import re_path
from . import views

urlpatterns = [
    re_path("msg", views.transportMail),
    re_path("comment", views.newComment),
    re_path("cmt", views.comments),
    re_path("test", views.test)
]
