import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

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
        style={{ backgroundImage: "linear-gradient(red, yellow)" }}
      >
        {restaurant.name}
      </Text>
      <Text className="absolute px-4 top-[38rem] h-20 text-white truncate shadow-md flex flex-col">
        {/* <Text>{restaurant.cost}</Text> */}
        <Text>{restaurant.rating}</Text>
      </Text>
    </Pressable>
  );
};

export default FoodPlane;
