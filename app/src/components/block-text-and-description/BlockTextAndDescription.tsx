import { FC } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Svg, { Line } from "react-native-svg";

type BlockTextAndDescriptionProps = {
  text: string;
  textColor?: string;
  description: string;
  descriptionColor?: string;
};

const { width } = Dimensions.get("window");

const BlockTextAndDescription: FC<BlockTextAndDescriptionProps> = ({
  text,
  description,
  textColor,
  descriptionColor,
}) => {
  return (
    <View style={styles.container}>
      <View
        style={{ backgroundColor: "#fff", zIndex: 10, flexDirection: "row" }}
      >
        <Text
          style={{
            color: textColor ? textColor : "#272728",
            fontSize: 14,
            fontWeight: "600",
            lineHeight: 18.2,
          }}
        >
          {text}
        </Text>
        <View style={{ backgroundColor: "#fff", zIndex: 9, width: 10 }} />
      </View>
      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 4,
          overflow: "hidden",
        }}
      >
        <Svg height="1.3" width={width - 40}>
          <Line
            x1="0"
            y1="0"
            x2={width}
            y2="0"
            stroke="#898E9F"
            strokeWidth="4"
            strokeDasharray="4 4"
          />
        </Svg>
      </View>
      <View
        style={{ backgroundColor: "#fff", zIndex: 10, flexDirection: "row" }}
      >
        <View style={{ backgroundColor: "#fff", zIndex: 9, width: 10 }} />
        <Text
          style={{
            color: descriptionColor ? descriptionColor : "#272728",
            fontSize: 14,
            fontWeight: "600",
            lineHeight: 18.2,
          }}
        >
          {description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
});

export default BlockTextAndDescription;
