import fs from 'fs';

export type serverPlaceData  = {
    name: string,
    location: {
        latitude: Number,
        longitude: Number
      },
    cost: Number,
    rating: Number, 
    food_array: string[]
}
type PRICE_LEVEL = "PRICE_LEVEL_FREE" | "PRICE_LEVEL_INEXPENSIVE" | "PRICE_LEVEL_MODERATE" | "PRICE_LEVEL_EXPENSIVE" | "PRICE_LEVEL_VERY_EXPENSIVE";

const priceLevelMap: Record<PRICE_LEVEL, number> = {
"PRICE_LEVEL_FREE": 0,
  "PRICE_LEVEL_INEXPENSIVE": 1,
  "PRICE_LEVEL_MODERATE": 2,
  "PRICE_LEVEL_EXPENSIVE": 3,
  "PRICE_LEVEL_VERY_EXPENSIVE": 4
};
/*
export enum PRICE_LEVEL {
    PRICE_LEVEL_FREE = 0, 
    PRICE_LEVEL_INEXPENSIVE = 1,
    PRICE_LEVEL_MODERATE = 2, 
    PRICE_LEVEL_EXPENSIVE = 3, 
    PRICE_LEVEL_VERY_EXPENSIVE = 4
}*/

export type googleImgType = {
    name: string,
    widthPx: Number,
    heightPx: Number,
    authorAttributions: [
      {
        displayName: string,
        uri: string,
        photoUri: string
    }
    ],
    flagContentUri: string
    googleMapsUri: string 
}
export type placeData = {
    location: {
        latitude: Number,
        longitude: Number
      },
      rating: Number,
      businessStatus: string,
      priceLevel: PRICE_LEVEL,
      displayName: {
        text: string,
        languageCode: string
      },
      photos: googleImgType[]
}
export type placesArray = {
    places: placeData[]
}

// this function removes all non-owner images from a restaurant
export function filterData(inputFileName : string, outputFileName: string){
    let jsonData: placesArray = JSON.parse(fs.readFileSync(inputFileName, 'utf8')); // Load and parse JSON

    //conso
    const jsonPlacesList = jsonData.places;
    // iterating over the places
    for (const place of jsonPlacesList){
        // iterating over the images in the place, checking to make sure
        let newImagesList : googleImgType[] = [];
        let ownerName = place.displayName.text;
        for(const img of place.photos){
            if(img.authorAttributions[0].displayName == ownerName){
                newImagesList.push(img);
            }
        }
        place.photos = newImagesList;
        
    }
    const placesJSON = JSON.stringify(jsonData!);
    fs.writeFile(outputFileName, placesJSON, (err) => {
        if (err) {
            console.log('Error writing file:', err);
        } else {
            console.log('Successfully wrote file');
        }
    });   

}

export function initServerPlaceData() : serverPlaceData {
    let tmpPlace: serverPlaceData = {
        name: "",
        location: {
            latitude: -1,
            longitude: -1
        },
        cost: -1,
        rating: -1, 
        food_array: []
    }
    return tmpPlace;
}

// this function takes the restaurant data that has already had the non-owner images removed and then puts it into a format for the server
export function filteredJSONtoTableJSON(inputFileName : string, outputFileName: string){
    let jsonData: placesArray = JSON.parse(fs.readFileSync(inputFileName, 'utf8')); // Load and parse JSON
    let serverJsonData : serverPlaceData[] = [];
    const jsonPlacesList = jsonData.places;
    let deepCopy : serverPlaceData;
    for(const place of jsonPlacesList){
        let tmpPlace: serverPlaceData = initServerPlaceData();
        tmpPlace.name = place.displayName.text;
        tmpPlace.location = place.location;
        tmpPlace.rating = place.rating;
        //let pLevel : PRICE_LEVEL = place.priceLevel
        console.log("price level of ", tmpPlace.name, ":", priceLevelMap[place.priceLevel]);
        tmpPlace.cost = priceLevelMap[place.priceLevel] ?? 3;
        let urisList : string[] = [];
        for(const img of place.photos){
            urisList.push(img.googleMapsUri);
        }
        tmpPlace.food_array = urisList;
        // trying to push a new deepcopy so that the same object is not pushed many times
        serverJsonData.push({...tmpPlace});
    }
    const placesJSON = JSON.stringify(serverJsonData!);

    fs.writeFile(outputFileName, placesJSON, (err) => {
        if (err) {
            console.log('Error writing file:', err);
        } else {
            console.log('Successfully wrote file');
        }
    });   
   
}

//filterData();
filteredJSONtoTableJSON("./filteredPlaceData.json", "serverPlaceData.json")
