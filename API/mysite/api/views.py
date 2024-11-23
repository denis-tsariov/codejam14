from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Restaurants, Users, Maps
from .serializers import RestaurantsSerializer, UsersSerializer, MapsSerializer
from rest_framework.views import APIView
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

# Create your views here.
class AllList(APIView):
    def get(self, request, format=None):
        all_list = {
            "restaurants": "/api/restaurants/",
            "users": "/api/users/",
            "maps": "/api/maps/"
        }
        return Response(all_list, status=status.HTTP_200_OK)


class RestaurantsListCreate(generics.ListCreateAPIView):
    queryset = Restaurants.objects.all()
    serializer_class = RestaurantsSerializer

    def delete(self, request, *args, **kwargs):
        Restaurants.objects.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class RestaurantsRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Restaurants.objects.all()
    serializer_class = RestaurantsSerializer
    lookup_field = "pk" 

class RestaurantsList(APIView):
    def get(self, request, format=None):
        name = request.query_params.get("name", "")

        if name:
            restaurants = Restaurants.objects.filter(name__icontains=name)
        else:
            # If no name matches return all 
            restaurants = Restaurants.objects.all()
    
        serializer = RestaurantsSerializer(restaurants, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class UserListCreate(generics.ListCreateAPIView):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer

    def delete(self, request, *args, **kwargs):
        Users.objects.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class UserRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer
    lookup_field = "pk"

class UserList(APIView):
    def get(self, request, format=None):
        username = request.query_params.get("username", "")

        if username:
            users = Users.objects.filter(username__icontains=username)
        else:
            # If no name matches return all 
            users = Users.objects.all()
    
        serializer = UsersSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
class MapsListCreate(generics.ListCreateAPIView):
    queryset = Maps.objects.all()
    serializer_class = MapsSerializer

    def delete(self, request, *args, **kwargs):
        Maps.objects.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class MapsRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Maps.objects.all()
    serializer_class = MapsSerializer
    lookup_field = "pk"

class MapsList(APIView):
    def get(self, request, format=None):
        listname = request.query_params.get("listname", "")

        if listname:
            maps = Maps.objects.filter(listname__icontains=listname)
        else:
            # If no name matches return all 
            maps = Maps.objects.all()
    
        serializer = MapsSerializer(maps, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# ----------- Auth Section ------------
@api_view(['POST'])
def login(request):
    user = get_object_or_404(User, username=request.data['username'])
    if not user.check_password(request.data['password']):
        return Response({"detail": "Incorrect user/password combination."}, status=status.HTTP_404_NOT_FOUND)
    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(user)
    return Response({"token": token.key, "user": serializer.data})

@api_view(['POST'])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username=request.data['username'])
        user.set_password(request.data['password'])
        user.save()
        token = Token.objects.create(user=user)
        return Response({'token': token.key, 'user': serializer.data})
    return Response(serializer.errors, status=status.HTTP_200_OK)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    return Response("passed for {}".format(request.user.email))
