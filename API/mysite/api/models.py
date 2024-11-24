from django.db import models
from django.contrib.auth.models import User 

# Create your models here.

class Restaurants(models.Model):
    PRICE_LEVEL = (
        (0, 'Free'),
        (1, 'Cheap'),
        (2, 'Moderate'),
        (3, 'Expensive'),
        (4, 'Very Expensive'))  
    name = models.CharField(max_length=100)
    location = models.JSONField()
    cost = models.IntegerField(choices=PRICE_LEVEL)
    rating = models.DecimalField(decimal_places=1, max_digits=3)
    food_array = models.JSONField(default=list, blank=True)

class Maps(models.Model):
    listname = models.CharField(max_length=100)
    restos = models.IntegerField()
    user_id = models.IntegerField()
    #restos = models.ForeignKey(Restaurants, on_delete=models.CASCADE)
    #user_id = models.ForeignKey(User, on_delete=models.CASCADE)  

class UserrFriends(models.Model):
    #user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    user_id = models.IntegerField()
    friend_id = models.IntegerField()
    
