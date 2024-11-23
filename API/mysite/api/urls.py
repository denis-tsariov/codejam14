from django.urls import path
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
        "users/", 
        views.UserListCreate.as_view(), 
        name="users-list-create"
        ),
    path(
        "users/<int:pk>/", 
        views.UserRetrieveUpdateDestroy.as_view(), 
        name="users-update"
        ),
    path(
        "maps/", 
        views.MapsListCreate.as_view(), 
        name="maps-list-create"
        ),
    path(
        "maps/<int:pk>/", 
        views.MapsRetrieveUpdateDestroy.as_view(), 
        name="maps-update"
        ),
]