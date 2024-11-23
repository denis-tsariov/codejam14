from rest_framework import serializers
from .models import Users, Restaurants, Maps

class RestaurantsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurants
        fields = ["id", "name", "location", "cost", "rating", "food_array"]

class MapsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Maps
        fields = ["id", "listname", "restos"]

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ["id", "username", "password", "email"]