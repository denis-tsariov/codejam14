import {
  StyleSheet,
  View,
  Text,
  Button,
  Alert,
  ScrollView,
  Pressable,
} from "react-native";
import { useAuth } from "../auth/auth-context";
import React, { useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";
import { getUsers } from "../../api_call/db_calls.js";
import { User } from "lucide-react-native";

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
      const filtered = data.filter((user: User) =>
        user.username.toLowerCase().includes(value.toString().toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  const handlePress = (user: User) => {
    setSelectedUser(user);
  };

  type User = {
    id: Number;
    username: string;
    email: string;
  };

  useEffect(() => {
    getUsers().then((data) => {
      setFilteredData(data);
      setData(data);
    });
  }, []);

  return (
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
      {true ? (
        <View style={{ flex: 1, gap: 20, paddingBottom: 100 }}>
          <Searchbar
            placeholder="Search..."
            onChangeText={updateSearch}
            value={search}
            style={styles.searchBar}
          />
          {filteredData.map((user: User, key) => (
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
              onPress={() => handlePress(user)}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <User color={"black"} />
                <Text style={{ fontSize: 18 }}>{user.username}</Text>
              </View>
              <Pressable
                className="border-2"
                style={{
                  width: 80,
                  height: 30,
                  backgroundColor: "#1d4ed8",
                  borderRadius: 12,
                }}
                onPress={() => console.log("follow pressed")}
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
  },
});
