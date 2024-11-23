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

export default function Modal() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const url = "http://10.0.2.2:8000/login";
  const authurl = "http://10.0.2.2:8000/test_token";

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
            Alert.alert(validationResponse.data);
          })
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
      <Text style={styles.title}>Sign Up</Text>

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

      <Button title="Log In" onPress={handleLogIn} />
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
