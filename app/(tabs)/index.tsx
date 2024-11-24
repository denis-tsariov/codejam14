import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import DecisionButtons from "@/components/home/decision-buttons";
import FoodPlane from "@/components/home/food-plane";
import food from "../../assets/data/users2";
import Swiper from "react-native-deck-swiper";
import {
  addMapRecord,
  getRestaurants,
  getRestaurantsForUser,
  addMapRed,
} from "@/api_call/db_calls";
import { useAuth } from "../auth/auth-context";

interface Restaurant {
  id: any;
  food_array: { length: number }[];
  // Add other properties of Restaurant here
}

export default function HomeScreen() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  useEffect(() => {
    getRestaurants().then((resp) => {
      setRestaurants(resp);
    });
  }, []);

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

  const { user }: any = useAuth();

  const [restaurantIndex, setRestaurantIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <View className="h-full w-full flex">
      <View className="absolute h-5/6 flex flex-col items-center justify-center bg-transparent">
        <Swiper
          cards={restaurants}
          renderCard={(restaurant) => {
            return (
              <FoodPlane restaurant={restaurant} imageIndex={imageIndex} />
            );
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
            setRestaurantIndex((prev) => (prev + 1) % restaurants.length);
          }}
          onSwipedAll={() => {
            console.log("onSwipedAll");
          }}
          onSwipedRight={async () => {
            const data = {
              user_id: user.id,
              restos: restaurants[restaurantIndex].id,
              listname: "saved",
            };
            //addMapRecord({
            addMapRed({
              data,
            }).then((resp) => console.log("resp", resp));
            getRestaurantsForUser(user.id).then((response) => {
              console.log("get", response);
            });
          }}
        />
      </View>
      <View
        style={{
          position: "absolute",
          width: "100%",
          marginTop: "175%",
          zIndex: 40,
        }}
      >
        <DecisionButtons
          onSwipeLeft={() => handleSwipe("left")}
          onSwipeRight={() => handleSwipe("right")}
        />
      </View>
    </View>
  );
}
