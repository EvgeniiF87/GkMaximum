import { useState, useRef, ReactNode, FC } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { Icon } from "../Icon/Icon";
import { AppIcons } from "../../Icons";

type SpoilerProps = {
  title: string;
  children: ReactNode;
  borderTop?: boolean;
  borderBottom?: boolean;
};

const Spoiler: FC<SpoilerProps> = ({
  title,
  children,
  borderTop,
  borderBottom,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const animationArrow = useRef(new Animated.Value(0)).current;

  const toggleSpoiler = () => {
    setIsExpanded(!isExpanded);
    Animated.timing(animation, {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();

    Animated.timing(animationArrow, {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  const arrowInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["90deg", "-90deg"],
  });

  const heightStyle = {
    maxHeight: heightInterpolate,
    overflow: "hidden" as "hidden",
  };

  const arrowStyle = {
    transform: [{ rotate: arrowInterpolate }],
  };

  return (
    <View
      style={{
        borderTopWidth: borderTop ? 0.2 : 0,
        borderBottomWidth: borderBottom ? 0.2 : 0,
        borderColor: "#898E9F",
        paddingVertical: 20,
        paddingHorizontal: 20,
      }}
    >
      <TouchableOpacity
        onPress={toggleSpoiler}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            color: "#272728",
          }}
        >
          {title.toUpperCase()}
        </Text>
        <Animated.View style={arrowStyle}>
          <Icon viewBox="8 14" size={15} path={AppIcons.app.arrowRight()} />
        </Animated.View>
      </TouchableOpacity>
      <Animated.View
        style={[heightStyle, { paddingVertical: isExpanded ? 10 : 0 }]}
      >
        {isExpanded && children}
      </Animated.View>
    </View>
  );
};

export default Spoiler;
