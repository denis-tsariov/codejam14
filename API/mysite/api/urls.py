from django.urls import path, re_path
from . import views

urlpatterns = [
    path(
        "", 
        views.AllList.as_view(),
        name="all-list"
    ),
    path(
        "friends/", 
        views.FriendsListCreate.as_view(),
        name="friends-list-create"
    ),
    path(
        "getFriends/",
        views.FriendsList.as_view(),
        name="get-friends-list"
    ),
    path(
        "friends/<int:pk>/",
        views.FriendsRetrieveUpdateDestroy.as_view(),
        name="friends-update"
    ),
    path(
        "user/", 
        views.UserList.as_view(),
        name="user-list-create"
    ),
    path('user/search/', 
         views.search_users, 
         name='search-users'),
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
    path('maps/common_restaurants/', 
         views.MapsCommonRestaurants.as_view(), 
         name='common-restaurants'
        ),
    path('maps/user_maps/', 
         views.MapsUserList.as_view(), 
         name='user-maps'
        ),
    re_path('login', views.login),
    re_path('signup', views.signup),
    re_path('test_token', views.test_token),
]