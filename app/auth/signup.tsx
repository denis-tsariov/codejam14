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
} from "react-native";
import axios from "axios";

const BASE_URL = 'http://127.0.0.1:8000';
const BASE_URL2 = 'http://10.0.2.2:8000';

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

      <Button title="Sign Up" onPress={handleSignUp} />
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
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});
