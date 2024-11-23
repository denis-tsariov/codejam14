import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Animated,
  PanResponder,
  Dimensions,
  Image,
  Text,
  StyleSheet,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25; // 25% of screen width

type FoodPlaneProps = {
  food: any;
  index: number;
  handleSwipe: any;
  nextFood: any;
};

const FoodPlane = forwardRef<any, FoodPlaneProps>(
  ({ food, index, handleSwipe, nextFood }, ref) => {
    const pan = useRef(new Animated.ValueXY()).current;

    useImperativeHandle(ref, () => ({
      swipe: (direction: "left" | "right") => {
        // handleSwipe(direction);
        Animated.spring(pan, {
          toValue: {
            x: direction === "right" ? SCREEN_WIDTH + 100 : -SCREEN_WIDTH - 100,
            y: 0,
          },
          useNativeDriver: true,
          friction: 10,
          tension: 40,
        }).start(() => {
          setNextFood(nextFood.image);
          pan.setValue({ x: 0, y: 0 });
        });
      },
    }));

    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
          useNativeDriver: false,
        }),
        onPanResponderRelease: (_, gestureState) => {
          if (Math.abs(gestureState.dx) > SWIPE_THRESHOLD) {
            // Swipe right
            if (gestureState.dx > 0) {
              Animated.spring(pan, {
                toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
                useNativeDriver: true,
              }).start();
              handleSwipe("right");
              // setTransparent((prev) => !prev);
              // // console.log("change transparency");
              // setTimeout(() => {
              //   pan.setValue({ x: 0, y: 0 });
              // }, 500);
            }
            // Swipe left
            else {
              Animated.spring(pan, {
                toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
                useNativeDriver: true,
              }).start();
              handleSwipe("left");
              // setTransparent((prev) => !prev);
              // // console.log("change transparency");
              // setTimeout(() => {
              //   pan.setValue({ x: 0, y: 0 });
              // }, 500);
            }
          } else {
            // Return to center if threshold not met
            Animated.spring(pan, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: true,
            }).start();
          }
        },
      })
    ).current;

    // Add rotation transform based on x position
    const rotate = pan.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ["-10deg", "0deg", "10deg"],
    });

    const [foodImage, setNextFood] = useState(food.image);

    return (
      <Animated.View
        className={"w-full h-full rounded-xl overflow-hidden border-2 absolute"}
        style={[
          {
            transform: [
              { translateX: pan.x },
              { translateY: pan.y },
              { rotate: rotate },
            ],
            zIndex: index,
          },
        ]}
        {...panResponder.panHandlers}
      >
        <Image
          source={{ uri: foodImage }}
          style={{ width: "100%", height: "100%" }}
        />
        <Text className="absolute text-4xl font-semibold bottom-0 pb-20 px-4 text-white w-full shadow-md">
          {food.name}
        </Text>
        <Text className="absolute px-4 top-[35rem] h-20 text-white truncate shadow-md">
          {food.bio}
        </Text>
      </Animated.View>
    );
  }
);

export default FoodPlane;
