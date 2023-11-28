
from rest_framework.serializers import ModelSerializer
from .models import Packages

class PackageSerializers(ModelSerializer):
    class Meta:
        model = Packages
        fields = "__all__"
