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
import {
  getRestaurantsForUser,
} from "@/api_call/db_calls";
import NotLoggedIn from "@/components/home/not-logged-in";
import buildMap from "@/hooks/makeFriendsDict";

export type friendsEntry = { id: Number; user_Id: Number; friend_id: Number };
export type restoEntry = {
  id: Number;
  name: string;
  location: { latitude: Number; longitude: Number };
  cost: Number;
  rating: Number;
  food_array: string[];
};

export default function Test() {
  const { user } = useAuth();
  const router = useRouter();
  //console.log("user", user);
  useEffect(() => {
    if (!user) {
      router.push("/my-profile");
    }
  }, [user]);

  const [restosFriendsLike, setRestosFriendsLike] = useState(
    new Map<Number, Number[]>()
  );
  useEffect(() => {
    if (user) {
      buildMap(+user.id).then((resp) => {
        setRestosFriendsLike(resp);
        //console.log("restos friends like favFoods", restosFriendsLike);
      });
    }
  }, [user]);

  const [userRestaurants, setUserRestaurants] = useState<restoEntry[]>([]);
  const [matchedUserRestaurants, setMatchedUserRestaurants] = useState<
    restoEntry[]
  >([]);
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      setMatchedUserRestaurants([]);
      if (user) {
        getRestaurantsForUser(user.id).then((data) => {
          //console.log("get IN FAVFOODS RESTOS FOR USER", data); // Ensure this logs the expected data
          setUserRestaurants(data); // Update state with fetched restaurants
        });
        //console.log("hello");
        //console.log("user restaurants:", userRestaurants);
      }

      

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  useEffect(() => {
    for (let resto of userRestaurants) {
      if (restosFriendsLike.has(resto.id)) {
        setMatchedUserRestaurants((prev) => [...prev, resto]);
      }
    }
  },[userRestaurants]);
  //console.log("the matched user restaurants:", matchedUserRestaurants);

  const windowWidth = Dimensions.get("window").width;
  const styles = StyleSheet.create({
    listContainer: {
      padding: 10,
      marginTop: 10,
    },
    itemContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
      backgroundColor: "#f9f9f9",
      padding: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#ddd",
      width: windowWidth * 0.9,
    },
    header: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 10,
      alignSelf: "center",
    },
    icon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
    name: {
      fontSize: 16,
      fontWeight: "500",
    },
  });

  let placeData = data;

  if (!user) {
    return <NotLoggedIn />;
  }
  return (
    //<Text>{JSON.stringify(friendsList)}</Text>
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
          {matchedUserRestaurants.map((resto, key) => (
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
                  {"$".repeat(resto.cost as number) + " | " + resto.rating + " ⭐️"}
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
//Test();
