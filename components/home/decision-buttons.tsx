import { View, Text } from "react-native";

export default function DecisionButtons({ onSwipeLeft, onSwipeRight } : any) {
  return (
    <View className="w-11/12 flex flex-row h-20 items-center justify-around">
      <View 
        className="flex justify-center items-center w-20 h-10 border bg-orange-900 rounded-xl"
        onTouchEnd={onSwipeLeft}
      >
        <Text className="text-white">No</Text>
      </View>
      <View 
        className="flex justify-center items-center w-20 h-10 border bg-green-800 rounded-xl"
        onTouchEnd={onSwipeRight}
      >
        <Text className="text-white">Yes</Text>
      </View>
    </View>
  );
}
