import { View, Text, Image, StyleSheet, FlatList , Dimensions, ScrollView, Pressable} from 'react-native';
import { serverPlaceData } from "@/hooks/filterPlacesData";
import { useLocalSearchParams } from "expo-router";
import { useFocusEffect } from "expo-router";
import React, {useState, useEffect} from "react";
import data from  "@/assets/data/users";
import { useAuth } from '../auth/auth-context';
import { getRestaurantsForUser } from '@/api_call/db_calls';

export type userEntry = {id: Number, username: string, email: string};
export type restoEntry = {id:number, 
  name: string, 
  location: {latitude: number,longitude:number},
  cost: number, 
  rating:number, 
  food_array: string[]};

export default function Test(){
    //const { user } = useAuth();
    const user = 1
    const [userRestaurants, setUserRestaurants] = useState<restoEntry[]>([]);
    useEffect(() => {
        getRestaurantsForUser(user).then((data) => {
            console.log("get", data); // Ensure this logs the expected data
            setUserRestaurants(data); // Update state with fetched restaurants
        });
    }, []);

    if (userRestaurants.length === 0) {
        return (
            <View style={styles.container}>
                <Text>No restaurants liked yet.</Text>
            </View>
        );
    }    

    // display the user's liked restaurants
    return (
        // <View style={styles.container}>
        //     <FlatList
        //         data={userRestaurants}
        //         renderItem={({item}) => (
        //             <View style={styles.item}>
        //                 {/* <Text>{item.name}</Text>
        //                 <Text>{item.location.latitude}, {item.location.longitude.toString()}</Text>
        //                 <Text>{item.cost}</Text>
        //                 <Text>{item.rating}</Text>
        //                 <Text>{item.food_array}</Text> */}
        //             </View>
        //         )}
        //     />
        // </View>
        <ScrollView
      style={{
        position: "absolute",
        paddingTop: 60,
        height: "100%",
        width: "100%",
        paddingLeft: 20,
        paddingRight: 20,
      }}
      className=""
    >
      {user ? (
        <View style={{ flex: 1, gap: 20, paddingBottom: 100 }}>
          {userRestaurants.map((resto, key) => (
            <Pressable
              key={key}
              className="h-20 border-2 rounded-xl"
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingRight: 20,
                paddingLeft: 20
              }}
              onPress={() => {}}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Text style={{ fontSize: 18 }}>{resto.name}</Text>
              </View>
              <Pressable
                className="border-2"
                style={{
                  width: 80,
                  height: 30,
                  backgroundColor: "#1d4ed8",
                  borderRadius: 12,
                }}
                onPress={async () => {}}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "white", fontSize: 16, textAlign:"center" }}>
                    follow
                  </Text>
                </View>
              </Pressable>
            </Pressable>
          ))}
        </View>
      ) : (
        <Text>Please Log in to use this feature !</Text>
      )}
    </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
    item: {
        padding: 16,
        marginBottom: 10,
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    text: {
        fontSize: 14,
        color: "#555",
    },
});

