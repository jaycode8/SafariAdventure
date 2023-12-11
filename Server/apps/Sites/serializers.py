

from rest_framework.serializers import ModelSerializer
from .models import Sites

class SitesSerializer(ModelSerializer):
    class Meta:
        model = Sites
        fields = "__all__"
        depth = 1


