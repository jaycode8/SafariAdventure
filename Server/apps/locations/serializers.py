
from rest_framework.serializers import ModelSerializer
from .models import Locations

class LocationSerializers(ModelSerializer):
    class Meta:
        model = Locations
        fields = "__all__"
