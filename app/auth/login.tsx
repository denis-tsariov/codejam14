import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useAuth } from "./auth-context";

const BASE_URL = 'http://127.0.0.1:8000';
const BASE_URL2 = 'http://10.0.2.2:8000';

export default function Modal() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const url = `${BASE_URL}/login`;
  const authurl = `${BASE_URL}/test_token`;
  const { user, setUser } = useAuth();

  const handleLogIn = async () => {
    if (!name || !password) {
      Alert.alert("Error", "All fields are required!");
      return;
    }
    const data = {
      username: name,
      password: password,
    };
    const headers = {
      "Content-type": "application/json",
    };
    axios.post(url, data, { headers }).then(function (response) {
      console.log(response.data);
      if (response.status == 200) {
        const authheaders = {
          ...headers,
          Authorization: `Token ${response.data.token}`,
        };
        axios
          .get(authurl, { headers: authheaders })
          .then(function (validationResponse) {
            Alert.alert("Successfully logged in !");
            setUser(validationResponse.data)
          }) // Handle successful response, navigate to the profile screen
          .catch(function (error) {
            console.log(error);
          });
      } else {
        Alert.alert("Invalid Credentials!");
      }
    }).catch( function (error){
      Alert.alert("Invalid Credentials!");
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.welcome}>Welcome Back</Text>
      <Text style={styles.title}>Log In</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.squareButton} onPress={handleLogIn} >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 50,
  },
  input: {
    width: "90%",
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  welcome: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 5,
  },
  squareButton: {
    width: 100, // Set width and height to make it square
    height: 50,
    borderWidth: 2,
    borderColor: "#000", // Black border color
    borderRadius: 10, // Rounded corners
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent", // Transparent background
    marginBottom: 15, // Add some spacing between buttons
    marginTop: 30,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
