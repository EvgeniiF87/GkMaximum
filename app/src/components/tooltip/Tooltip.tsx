import { useEffect, useState } from "react";
import { View, Text, Dimensions, Animated } from "react-native";

const { width } = Dimensions.get("window");

const Tooltip = () => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 3000,
        useNativeDriver: true,
      }).start(() => {
        setIsVisible(!isVisible);
      });
    }, 4000);
  }, []);

  return (
    <>
      {isVisible && (
        <Animated.View
          style={{
            opacity: fadeAnim,
            position: "absolute",
            bottom: -64,
            right: -10.3,
            width: width - 140,
            borderRadius: 10,
            backgroundColor: "rgba(115, 115, 123, 1)",
            paddingHorizontal: 8,
            paddingVertical: 10,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              position: "absolute",
              backgroundColor: "rgba(115, 115, 123, 1)",
              top: -13,
              right: 12,
              width: 23,
              height: 13,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                width: 23,
                height: 23,
                borderRadius: 30,
                position: "absolute",
                left: -12.3,
                top: -10,
              }}
            ></View>
            <View
              style={{
                backgroundColor: "#fff",
                width: 23,
                height: 23,
                borderRadius: 30,
                position: "absolute",
                right: -12.3,
                top: -10,
              }}
            ></View>
          </View>
          <Text
            style={{
              color: "rgba(255, 255, 255, 1)",
              fontSize: 12,
              fontWeight: "600",
              lineHeight: 15.6,
            }}
          >
            Включите уведомление, что бы не пропустить поступление товара
          </Text>
        </Animated.View>
      )}
    </>
  );
};

export default Tooltip;
