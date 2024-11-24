import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";
import { serverPlaceData } from "@/hooks/filterPlacesData";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useFocusEffect } from "expo-router";
import React, { useState, useEffect } from "react";
import data from "@/assets/data/users";
import { useAuth } from "../auth/auth-context";
import { getRestaurantsForUser } from "@/api_call/db_calls";
import NotLoggedIn from "@/components/home/not-logged-in";

export type userEntry = { id: Number; username: string; email: string };
export type restoEntry = {
  id: number;
  name: string;
  location: { latitude: number; longitude: number };
  cost: number;
  rating: number;
  food_array: string[];
};

export default function Test() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/my-profile");
    }
  }, [user]);

  //const user = 1
  const [userRestaurants, setUserRestaurants] = useState<restoEntry[]>([]);
  useFocusEffect(
    React.useCallback(() => {
      if (user) {
        //console.log("This is the user in teh useEffect of myfoods", user);
        getRestaurantsForUser(user.id).then((data) => {
          //console.log("get in myFoods", data); // Ensure this logs the expected data
          setUserRestaurants(data); // Update state with fetched restaurants
        });
      }
      return () => {};
    }, [])
  );

  if (!user) {
    return <NotLoggedIn />;
  }

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
                paddingLeft: 20,
              }}
              onPress={() => {}}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: "600", paddingTop: 10 }}
                >
                  {resto.name}
                </Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  <Text>
                    {"$".repeat(resto.cost) + " | " + resto.rating + " ⭐️"}
                  </Text>
                </View>
              </View>
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
