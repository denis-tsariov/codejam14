import fs from 'fs';
 /// <reference types="googlemaps" />

export default async function nearbySearch() {
  let center = new google.maps.LatLng(45.5035, 73.5685);
  const { Place, SearchNearbyRankPreference } = await google.maps.importLibrary('places') as google.maps.PlacesLibrary;
  //const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
  const request = {
      // required parameters
      fields: ['displayName', 'location', 'businessStatus', 'photos', 'rating', 'rating' ,'price_level', 'url'],
      locationRestriction: {
          center: center,
          radius: 500, 
      },
      // optional parameters
      includedPrimaryTypes: ['restaurant'],
      maxResultCount: 10,
      rankPreference: SearchNearbyRankPreference.POPULARITY,
      language: 'en-CA',
      region: 'ca',
  };

  console.log("attempt")
  const { places } = await Place.searchNearby(request);
  let placesJSON = JSON.stringify(places);

  fs.writeFile('user.json', placesJSON, (err) => {
      if (err) {
          console.log('Error writing file:', err);
      } else {
          console.log('Successfully wrote file');
      }
  });   
}
//console.log("hello");
//nearbySearch();

/*
curl -X POST -d '{
    "includedTypes": ["restaurant"],
    "maxResultCount": 1,
    "locationRestriction": {
      "circle": {
        "center": {
          "latitude": 45.5035,
          "longitude": 73.5685},
        "radius": 500.0
      }
    }
  }' \
  -H 'Content-Type: application/json' -H "X-Goog-Api-Key: AIzaSyDfJaI3mHEs6L6e9fwkyMb0VygFqWZYbzQ" \
  -H "X-Goog-FieldMask: places.displayName,places.location,places.businessStatus,places.photos,places.rating,places.price_level,places.url" \
  https://places.googleapis.com/v1/places:searchNearby
  */