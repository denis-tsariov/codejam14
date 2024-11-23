import { useState, useRef } from "react";
import { View, StyleSheet } from "react-native";
import DecisionButtons from "@/components/home/decision-buttons";
import FoodPlane from "@/components/home/food-plane";
import food from "../../assets/data/users";

export default function HomeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(currentIndex);
  const swipeRef = useRef<{
    swipe: (direction: "left" | "right") => void;
  } | null>(null);

  function handleSwipe(direction: "left" | "right") {
    swipeRef.current?.swipe(direction);
    // Move to next card after animation
    setTimeout(() => {
      setCurrentIndex((index) => index + 1);
    }, 500);
    console.log("update currentIndex", currentIndex);
  }

  return (
    <View className="w-full h-full flex flex-col items-center justify-center relative">
      {currentIndex < food.length && (
        <View className="w-11/12 relative" style={styles.thing}>
          <FoodPlane
            food={food[currentIndex]}
            index={1}
            ref={swipeRef}
            handleSwipe={handleSwipe}
            nextFood={food[currentIndex + 1]}
          />
          {currentIndex + 1 < food.length && (
            <FoodPlane
              food={food[currentIndex + 1]}
              index={0}
              handleSwipe={null}
              nextFood={null}
            />
          )}
        </View>
      )}
      <DecisionButtons
        onSwipeLeft={() => handleSwipe("left")}
        onSwipeRight={() => handleSwipe("right")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  thing: {
    height: "66.66%",
  },
});
