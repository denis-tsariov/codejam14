import { Link } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../auth/auth-context";

export default function MyProfile() {
  const { user, setUser } = useAuth();
  const handleLogOut = () => {
    setUser(null);
  }
  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text>Logged in!</Text>
          <Button title="logout" onPress={handleLogOut}/>
        </>
      ) : (
        <>
          <Text>Welcome</Text>

          {/* Link to the Login Modal */}
          <Link href="/auth/login" style={styles.link}>
            Login
          </Link>

          {/* Link to the Sign Up Modal */}
          <Link href="/auth/signup" style={styles.link}>
            Sign Up
          </Link>
        </>
      )}
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
