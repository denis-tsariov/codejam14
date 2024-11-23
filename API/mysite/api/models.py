from django.db import models
from django.contrib.auth.models import User 

# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    password_token = models.CharField(max_length=100, blank=True)
    email = models.EmailField(max_length=100, blank=True)

    def __str__(self):
        return self.user.username

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
    restos = models.ForeignKey(Restaurants, on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)  
    image_url = models.CharField(max_length=100, blank=True) 

    """
    class Meta:
        ordering = ["listname"]
    """    

    def __str__(self):
        return self.name