import { StyleSheet, View, Text, FlatList } from "react-native";
import { useAuth } from "../auth/auth-context";
import React, { useState } from "react";
import { Searchbar } from "react-native-paper";

export default function TabTwoScreen() {
  const { user, setUser } = useAuth();
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const updateSearch = (value) => {
    setSearch(value);
  };
  const data = [
    { id: "1", name: "Apple" },
    { id: "2", name: "Banana" },
    { id: "3", name: "Orange" },
    { id: "4", name: "Grapes" },
    { id: "5", name: "Mango" },
  ];

  return (
    <View style={styles.container}>
      {user ? (
        <View style={styles.container}>
          <Searchbar
            placeholder="Search..."
            onChangeText={updateSearch}
            value={search}
            style={styles.searchBar}
          />
          <FlatList
            data={filteredData.length > 0 ? filteredData : data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Text style={styles.item}>{item.name}</Text>
            )}
          />
        </View>
      ) : (
        <Text>Please Log in to use this feature !</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  searchBar: {
    marginBottom: 10,
  },
  item: {
    padding: 10,
    fontSize: 18,
  },
});