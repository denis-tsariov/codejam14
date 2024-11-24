from rest_framework import serializers
from .models import Restaurants, Maps, UserrFriends
from django.contrib.auth.models import User

class RestaurantsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurants
        fields = ["id", "name", "location", "cost", "rating", "food_array"]

class MapsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Maps
        fields = ["id", "listname", "restos", "user_id"] 

class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User 
        fields = ['id', 'username', 'password', 'email']

class FriendSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = UserrFriends
        fields = ['id', 'user_id', 'friend_id']