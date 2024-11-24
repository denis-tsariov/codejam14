import { Tabs } from "expo-router";
import React from "react";
import { useState } from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  Utensils,
  UserRoundSearch,
  User,
  Heart,
  HeartHandshake,
} from "lucide-react-native";
import { serverPlaceData } from "@/hooks/filterPlacesData";
export default function TabLayout() {
  const colorScheme = useColorScheme();

  const [likedPlaces, setLikedPlaces] = useState<serverPlaceData[]>([]);
  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        // tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => <UserRoundSearch color={color} />,
        }}
      />

      <Tabs.Screen
        name="favFoods"
        options={{
          title: "Food Match",
          tabBarIcon: ({ color }) => <HeartHandshake color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Find Food",
          tabBarIcon: ({ color }) => <Utensils color={color} />,
        }}
        //children={()=><Test propName={likedPlaces}/>}
      />
      <Tabs.Screen
        name="myFoods"
        options={{
          title: "My likes",
          tabBarIcon: ({ color }) => <Heart color={color} />,
        }}
      />
      <Tabs.Screen
        name="my-profile"
        options={{
          title: "My Profile",
          tabBarIcon: ({ color }) => <User color={color} />,
        }}
      />

      <Tabs.Screen name="login" options={{ title: "Login" }} />
      <Tabs.Screen name="signup" options={{ title: "SignUp" }} />
    </Tabs>
  );
}
