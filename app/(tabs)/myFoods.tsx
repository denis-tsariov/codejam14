import { View, Text, Image, StyleSheet, FlatList , Dimensions} from 'react-native';
import { serverPlaceData } from "@/hooks/filterPlacesData";
import { useLocalSearchParams } from "expo-router";
import { useFocusEffect } from "expo-router";
import React, {useState, useEffect} from "react";
import data from  "@/assets/data/users";
import { useAuth } from '../auth/auth-context';
import { getFriendsForUser, getRestaurantById } from '@/api_call/db_calls';

export type userEntry = {id: Number, username: string, email: string};
export type restoEntry = {id:Number, 
  name: string, 
  location: {latitude: Number,longitude:Number},
  cost: Number, 
  rating:Number, 
  food_array: string[]};

// display the user's restaurants map 
export default function Test() {
    const { user } = useAuth();
    
}
