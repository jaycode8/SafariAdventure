
from rest_framework.serializers import ModelSerializer
from .models import AccomodationType, Accomodations

class AccTypeSerializers(ModelSerializer):
    class Meta:
        model = AccomodationType
        fields = "__all__"

class AccomodationSerializers(ModelSerializer):
    class Meta:
        model = Accomodations
        fields = "__all__"
