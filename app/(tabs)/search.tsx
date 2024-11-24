import {
  StyleSheet,
  View,
  Text,
  Button,
  Alert,
} from "react-native";
import { useAuth } from "../auth/auth-context";
import React, { useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";
import getUsers from '../../api_call/db_calls.js';

export default function TabTwoScreen() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const updateSearch = (value: React.SetStateAction<string>) => {
    setSearch(value);

    if (value) {
      const filtered = data.filter((user : User) =>
        user.username.toLowerCase().includes(value.toString().toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  const handlePress = (user : User) => {
    setSelectedUser(user);
  };

  type User = {
    id: Number;
    username: string;
    email: string;
  };

  useEffect(() => {
    getUsers().then((data) => {
      setFilteredData(data)
      setData(data)
    });
  }, [])

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
          {filteredData.map((user: User, key) => (
            <View key={key} style={styles.users}>
              <Button title={user.username} onPress={() => handlePress(user)} />
            </View>
          ))}
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
    padding: 20,
    backgroundColor: "#fff",
  },
  searchBar: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  item: {
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  tags: {
    flexDirection: "row",
    marginTop: 5,
  },
  tag: {
    fontSize: 14,
    color: "#555",
    marginRight: 10,
  },
  users: {
    flex: 1,
    padding: 0,
    margin: 0,
    gap: 0,
    height: 0,
  }
});
