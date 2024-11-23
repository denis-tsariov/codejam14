from rest_framework import serializers
from .models import Users, Restaurants, Maps
from django.contrib.auth.models import User

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

class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User 
        fields = ['id', 'username', 'password', 'email']