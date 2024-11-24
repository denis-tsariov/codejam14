import { View, Text } from "react-native";

export default function NotLoggedIn() {
  return (
    <View className="h-full w-full flex justify-center items-center">
      <Text className="font-semibold text-3xl">Hi There!</Text>
      <Text className="text-xl w-96 text-center">
        Sign up to keep{" "}
        <Text className="font-semibold text-green-700">
          your liked restaurant
        </Text>
        , <Text className="font-semibold text-blue-700">follow people</Text> and
        see what restaurants they like!
      </Text>
    </View>
  );
}
