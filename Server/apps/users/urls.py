
from django.urls import re_path
from . import views

urlpatterns = [
    re_path("test", views.test_route, name="a test route"),
    re_path("signup", views.signup_view),
    re_path("verify", views.verification),
    re_path("signin", views.signin_view),
    re_path("user", views.user_route),
]

