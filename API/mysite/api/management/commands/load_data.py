from django.core.management.base import BaseCommand
import json
from api.models import Restaurants

class Command(BaseCommand):
    help = 'Load data from a JSON file into the database'
    file_path: str

    def add_arguments(self, parser):
        parser.add_argument('file_path', type=str, help='Path to the JSON file')

    def handle(self, *args, **kwargs):
        file_path = kwargs['file_path']

        with open(file_path, 'r') as file:
            data = json.load(file)
        
        restos = [
            Restaurants(
                name=resto['name'],
                location=resto['location'],
                cost=resto['cost'],
                rating=resto['rating'],
                food_array=resto['food_array']
            )
            for resto in data
        ]
        Restaurants.objects.bulk_create(restos)
        self.stdout.write(self.style.SUCCESS('Data loaded successfully'))


# python3 manage.py load_data api/management/commands/data.json 





