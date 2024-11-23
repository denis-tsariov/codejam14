import { useRef } from "react";
import { View } from "react-native";
import DecisionButtons from "@/components/home/decision-buttons";
import FoodPlane from "@/components/home/food-plane";
import food from "../../assets/data/users";
import Swiper from "react-native-deck-swiper";

export default function HomeScreen() {
  const swiperRef = useRef<Swiper<any>>(null);

  const handleSwipe = (direction: "left" | "right") => {
    if (!swiperRef.current) {
      console.log("ayo?");
      return;
    }
    if (direction === "left") {
      console.log("swipe left");
      swiperRef.current.swipeLeft();
    } else {
      console.log("swipe right");
      swiperRef.current?.swipeRight();
    }
  };

  return (
    <View className="h-full w-full relative">
      <View className="absolute h-5/6 top-0 flex flex-col items-center justify-center bg-transparent">
        <Swiper
          cards={food}
          renderCard={(card) => {
            return <FoodPlane food={card} />;
          }}
          ref={swiperRef}
          // stackSeparation={14}
          // stackScale={0.95}
          disableBottomSwipe
          disableTopSwipe
          showSecondCard={true}
          cardIndex={0}
          backgroundColor={"#FFFFFF"}
          stackSize={3}
          useViewOverflow={false}
          onSwiped={(cardIndex) => {
            console.log(cardIndex);
          }}
          onSwipedAll={() => {
            console.log("onSwipedAll");
          }}
        />
      </View>
      <DecisionButtons
        onSwipeLeft={() => handleSwipe("left")}
        onSwipeRight={() => handleSwipe("right")}
      />
    </View>
  );
}
