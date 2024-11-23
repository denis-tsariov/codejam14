from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Restaurants, Maps
from .serializers import RestaurantsSerializer, MapsSerializer, UserSerializer
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

# Custom APIView to get the food array of a restaurant
class RestaurantsFoodArray(APIView):
    def get(self, request, pk, format=None):
        restaurant = get_object_or_404(Restaurants, pk=pk)
        food_array = restaurant.food_array  
        return JsonResponse({"food_array": food_array}, status=status.HTTP_200_OK)

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

class MapsCommonRestaurants(APIView): 
    def get(self, request, format=None):
            user1_id = request.query_params.get('user1_id')
            user2_id = request.query_params.get('user2_id')

            if not user1_id or not user2_id:
                return Response(
                    {"error": "user1_id and user2_id are required"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            # Get the restaurant IDs for both users
            user1_restaurants = Maps.objects.filter(user_id=user1_id).values_list('restos', flat=True)
            user2_restaurants = Maps.objects.filter(user_id=user2_id).values_list('restos', flat=True)
            # Find common restaurants
            common_restaurants_ids = set(user1_restaurants) & set(user2_restaurants)
            # Get the details of the common restaurants
            common_restaurants = Restaurants.objects.filter(id__in=common_restaurants_ids)
            # Serialize the restaurant data
            serializer = RestaurantsSerializer(common_restaurants, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
    
class MapsUserList(APIView):
    def get(self, request, format=None):
        user_id = request.query_params.get("user_id")
        if not user_id:
            return Response(
                {"error": "user_id is required"},
                status=status.HTTP_400_BAD_REQUEST
            )
        # Get all restaurant IDs mapped to the user
        user_restaurants = Maps.objects.filter(user_id=user_id).values_list("restos", flat=True)
        # Get the restaurant details from the Restaurants table
        restaurants = Restaurants.objects.filter(id__in=user_restaurants)
        # Serialize the data
        serializer = RestaurantsSerializer(restaurants, many=True)
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
    return Response({
        'id': request.user.id,
        'username': request.user.username,
        'email':request.user.email,})
