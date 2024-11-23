import { Check, X } from "lucide-react-native";
import { View, Text } from "react-native";

export default function DecisionButtons({ onSwipeLeft, onSwipeRight }: any) {
  return (
    <View className="">
      <View className="w-full h-20 flex flex-row items-center justify-around">
        <View
          className="flex justify-center items-center w-20 h-10 border-2 bg-red-300 rounded-xl"
          onTouchEnd={onSwipeLeft}
        >
          <X color={"black"} strokeWidth={3} />
        </View>
        <View
          className="flex justify-center items-center w-20 h-10 border-2 bg-green-300 rounded-xl"
          onTouchEnd={onSwipeRight}
        >
          <Check color={"black"} strokeWidth={3} />
        </View>
      </View>
    </View>
  );
}
