from django.urls import path, re_path
from . import views

urlpatterns = [
    path(
        "", 
        views.AllList.as_view(),
        name="all-list"
    ),
    path(
        "restaurants/", 
         views.RestaurantsListCreate.as_view(), 
         name="restaurants-view-create"
         ),
    path(
        "restaurants/<int:pk>/", 
        views.RestaurantsRetrieveUpdateDestroy.as_view(), 
        name="update", 
        ),
    path(
        "maps/", 
        views.MapsListCreate.as_view(), 
        name="maps-list-create"
        ),
    path(
        "restaurants/food_array/<int:pk>/", 
        views.RestaurantsFoodArray.as_view(), 
        name="food-array"
        ),
    path(
        "maps/<int:pk>/", 
        views.MapsRetrieveUpdateDestroy.as_view(), 
        name="maps-update"
        ),
    re_path('login', views.login),
    re_path('signup', views.signup),
    re_path('test_token', views.test_token),
]