import { FC, useEffect, useState } from "react";
import { Animated, Easing, StyleProp, ViewStyle } from "react-native";

type SceletonPropsType = {
  styles?: StyleProp<ViewStyle>;
  width?: number;
  height?: number;
  borderRadius?: number;
};

const Sceleton: FC<SceletonPropsType> = ({
  styles,
  width,
  height,
  borderRadius,
}) => {
  const [animationSceleton] = useState(new Animated.Value(0));

  const startAnimationSceleton = () => {
    Animated.loop(
      Animated.timing(animationSceleton, {
        toValue: 1,
        duration: 1600,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
  };

  useEffect(() => {
    startAnimationSceleton();
  }, []);

  const backgroundColor = animationSceleton.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["#f0f0f0", "#e0e0e0", "#f0f0f0"],
  });

  return (
    <Animated.View
      style={[
        styles,
        {
          width: width ? width : "100%",
          height: height ? height : 160,
          borderRadius,
        },
        { backgroundColor },
      ]}
    />
  );
};

export default Sceleton;
