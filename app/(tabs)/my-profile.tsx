import { Link } from "expo-router";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useAuth } from "../auth/auth-context";
import { Bold } from "lucide-react-native";

export default function MyProfile() {
  const { user, setUser } = useAuth();
  const handleLogOut = () => {
    setUser(null);
  }
  return (
    <View style={styles.container}>
      {user ? (
        <>
          {/* Circular user profile image */}
          <View style={styles.profileContainer}>
            {/* Circular user profile image */}
            <View style={styles.profileCircle} />

            {/* Display user's name */}
            <Text style={styles.title}>{user.username}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>

            <View style={styles.bottomButtonContainer}>
              <TouchableOpacity style={styles.squareButton} onPress={handleLogOut}>
                <Text style={styles.buttonText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          

        </>
      ) : (
        <>
          <View style={styles.profileContainer}>
            <View style={styles.logo} />
          </View>
          <Text style={styles.welcome}>Welcome to APP</Text>

          {/* Login Button */}
          <TouchableOpacity style={styles.squareButton2}>
            <Link href="/auth/login">
              Log In 
            </Link>
          </TouchableOpacity>

          {/* Sign Up Button */}
          <TouchableOpacity style={styles.squareButton2}>
            <Link href="/auth/signup">
              Sign Up
            </Link>
          </TouchableOpacity>
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
    paddingHorizontal: 20,
  },
  link: {
    paddingTop: 20,
    fontSize: 20,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: "#CBC3E3",
    marginBottom: 30,
  },
  welcome: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 50,
  },
  profileCircle: {
    width: 200,
    height: 200,
    borderRadius: 150,
    backgroundColor: "#ddd", // Light grey color for the circle
    marginBottom: 20, // Spacing between the circle and text
  },
  profileContainer: {
    alignItems: "center", // Center align the profile section
    marginTop: 50, // Add some margin from the top
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 10,
  },
  email: {
    fontSize: 16,
    color: "#666",
  },
  bottomButtonContainer: {
    marginBottom: 30, 
    marginTop: 230,
    width: "100%", 
    alignItems: "center",
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
  },
  squareButton2: {
    width: 200, // Set width and height to make it square
    height: 50,
    borderWidth: 2,
    borderColor: "#000", // Black border color
    borderRadius: 10, // Rounded corners
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent", // Transparent background
    marginBottom: 15, // Add some spacing between buttons
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
