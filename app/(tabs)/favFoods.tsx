import { View, Text, Image, StyleSheet, FlatList , Dimensions} from 'react-native';
import { serverPlaceData } from "@/hooks/filterPlacesData";
import { useLocalSearchParams } from "expo-router";
import { useFocusEffect } from "expo-router";
import React from "react";
import data from  "@/assets/data/users";
export default function Test()
  {
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
      <Text>test</Text>
      <FlatList
      data={placeData}
      keyExtractor={(item, index) => `${item.name}-${index}`}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Image source={{ uri: item.image }} style={styles.icon} />
          <Text style={styles.name}>{item.name}</Text>
        </View>
      )}
      contentContainerStyle={styles.listContainer}
    />
    </View>
  );
}
