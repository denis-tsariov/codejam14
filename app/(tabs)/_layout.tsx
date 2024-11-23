import { Tabs } from "expo-router";
import React from "react";
import {useState} from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Utensils, Map, User } from "lucide-react-native";
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
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => <Map color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Food",
          tabBarIcon: ({ color }) => <Utensils color={color} />,
        }}
        //children={()=><Test propName={likedPlaces}/>}
      />
      <Tabs.Screen
        name="favFoods"
        options={{
          title: "FavFoods",
          tabBarIcon: ({ color }) => <Utensils color={color} />,
        }}
        
      />
      <Tabs.Screen
        name="my-profile"
        options={{
          title: "My Profile",
          tabBarIcon: ({ color }) => <User color={color} />,
        }}
      />
      <Tabs.Screen  
        name="login"
        options={{ title: "Login" }}
      />
      <Tabs.Screen  
        name="signup"
        options={{ title: "SignUp" }}
      />
    </Tabs>
  );
}
