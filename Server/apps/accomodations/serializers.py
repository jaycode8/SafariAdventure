
from rest_framework.serializers import ModelSerializer
from .models import AccomodationType

class AccTypeSerializers(ModelSerializer):
    class Meta:
        model = AccomodationType
        fields = "__all__"
