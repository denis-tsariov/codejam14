import { useState } from "react";
import { Image, Pressable, Text, View, StyleSheet } from "react-native";

const FoodPlane = ({ restaurant }: any) => {
  const [imageIndex, setImageIndex] = useState(0);
  if (restaurant === null || restaurant === undefined) {
    return;
  }
  return (
    <Pressable
      className={"w-full h-5/6 rounded-xl overflow-hidden border-2"}
      onPress={() => {
        setImageIndex((prev) => (prev + 1) % restaurant.food_array.length);
      }}
    >
      <Image
        source={{ uri: restaurant.food_array[imageIndex] }}
        style={{ width: "100%", height: "100%" }}
      />
      <Text
        className="absolute text-4xl font-semibold bottom-0 pb-20 px-4 text-white w-full shadow-ms"
        style={styles.restaurantName}
      >
        {restaurant.name}
      </Text>
      <Text
        className="absolute px-4 top-[38rem] h-20 text-white truncate shadow-md flex flex-col font-semibold text-xl"
        style={styles.ratingText}
      >
        <Text>
          {"$".repeat(restaurant.cost) + " | " + restaurant.rating + " ⭐️"}
        </Text>
      </Text>
    </Pressable>
  );
};

export default FoodPlane;

const styles = StyleSheet.create({
  restaurantName: {
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  ratingText: {
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});
