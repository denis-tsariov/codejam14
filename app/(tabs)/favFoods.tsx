import { View, Text, Image, StyleSheet, FlatList , Dimensions} from 'react-native';
import { serverPlaceData } from "@/hooks/filterPlacesData";
import { useLocalSearchParams } from "expo-router";
import { useFocusEffect } from "expo-router";
import React, {useState, useEffect} from "react";
import data from  "@/assets/data/users";
import { useAuth } from '../auth/auth-context';
import { getFriends, getRestaurantById } from '@/api_call/db_calls';

export type friendsEntry = {id: Number, user_Id: Number, friend_id: Number};
export type restoEntry = {id:Number, 
  name: string, 
  location: {latitude: Number,longitude:Number},
  cost: Number, 
  rating:Number, 
  food_array: string[]};

export default async function Test(){
  const { user } = useAuth();
    const [friendsList, setFriendsList] = useState([]);
    useEffect(() => {
      getFriends(user).then((data) => {
        setFriendsList(data)
      });
    }, [])
    // restosFriendsLike should be a map where the restaurant ids are the key and then we have 
    const restosFriendsLike = new Map<Number, Number[]>();
    for (let friendEntry of friendsList){
      let tmp = (friendEntry as friendsEntry);
      let response = await getRestaurantById(tmp.friend_id);
      for (let restoEntry of response){
        let tmpResto = (restoEntry as restoEntry);
        if (restosFriendsLike.has(tmpResto.id)){
          restosFriendsLike.get(tmpResto.id)?.push(tmp.friend_id);
        } 
        else {
          restosFriendsLike.set(tmpResto.id, [tmp.friend_id]);
        }
      }
    }

  //const { likedPlaces } = useLocalSearchParams();
  useFocusEffect(
    React.useCallback(() => {
     //alert('Screen was focused');
      // Call DB and load liked places
      return () => {
        //alert('Screen was unfocused');
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
    marginTop: 10
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    width: windowWidth*0.90
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
});

  let placeData = data;
  return (
    <View className="h-full flex justify-center items-center">
      <FlatList
      data={placeData}
      keyExtractor={(item, index) => `${item.name}-${index}`}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Image source={{ uri: item.image }} style={styles.icon} />
          <Text style={styles.name}>{item.name}</Text>
        </View>
      )}
      ListHeaderComponent={
        <Text style={styles.header}>Recently Liked</Text>
      }
      contentContainerStyle={styles.listContainer}
    />
    </View>
  );
}
