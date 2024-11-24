import { Link, router } from "expo-router";
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

const BASE_URL2 = 'http://127.0.0.1:8000';
const BASE_URL = 'http://10.0.2.2:8000';

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const url = `${BASE_URL}/signup`;

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "All fields are required!");
      return;
    }
    const data = {
      username: name,
      password: password,
      email: email,
    };
    const headers = {
      "Content-type": "application/json",
    };
    // Here, you would typically send data to a backend server
    axios
      .post(url, data, { headers })
      .then(function (response) {
        console.log(response.data);
        if (response.status === 200) {
          if (response.data.username) {
            Alert.alert("User with that username already exists!");
          } else if (response.data.email) {
            Alert.alert("Please enter a valid email address!");
          } else {
            Alert.alert("Success", `Welcome, ${response.data.user.username}!`);
          }
          // Handle successful response, e.g., navigate to a new screen
        } else {
          Alert.alert("Error", "Something went wrong!");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.welcome}>Create Account</Text>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.squareButton} onPress={handleSignUp} >
        <Text style={styles.buttonText}>Sign Up</Text>
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
