import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function MyProfile() {
  return (
    <View style={styles.container}>
      <Text>Welcome</Text>

      {/* Link to the Login Modal */}
      <Link href="/auth/login" style={styles.link}>
        Login
      </Link>

      {/* Link to the Sign Up Modal */}
      <Link href="/auth/signup" style={styles.link}>
        Sign Up
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    paddingTop: 20,
    fontSize: 20,
  },
});
