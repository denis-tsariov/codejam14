import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

const FoodPlane = ({ food }: any) => {
  const [imageIndex, setImageIndex] = useState(0);
  return (
    <Pressable
      className={"w-full h-5/6 rounded-xl overflow-hidden border-2"}
      onPress={() => {
        setImageIndex((prev) => (prev + 1) % food.images.length);
      }}
    >
      <Image
        source={{ uri: food.images[imageIndex] }}
        style={{ width: "100%", height: "100%" }}
      />
      <Text className="absolute text-4xl font-semibold bottom-0 pb-20 px-4 text-white w-full shadow-md">
        {food.name}
      </Text>
      <Text className="absolute px-4 top-[38rem] h-20 text-white truncate shadow-md">
        {food.bio}
      </Text>
    </Pressable>
  );
};

export default FoodPlane;
