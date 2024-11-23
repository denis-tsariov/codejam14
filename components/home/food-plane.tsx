import { Image, Text, View } from "react-native";

const FoodPlane = ({ food }: any) => {
  return (
    <View className={"w-full h-5/6 rounded-xl overflow-hidden border-2"}>
      <Image
        source={{ uri: food.image }}
        style={{ width: "100%", height: "100%" }}
      />
      <Text className="absolute text-4xl font-semibold bottom-0 pb-20 px-4 text-white w-full shadow-md">
        {food.name}
      </Text>
      <Text className="absolute px-4 top-[35rem] h-20 text-white truncate shadow-md">
        {food.bio}
      </Text>
    </View>
  );
};

export default FoodPlane;
