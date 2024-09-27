import { FC } from "react";
import { View, ActivityIndicator, Text } from "react-native";

type SpinerPropsType = {
  title?: string;
};

const Spiner: FC<SpinerPropsType> = ({ title }) => {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 400,
      }}
    >
      {title && (
        <Text
          style={{
            color: "#D71E56",
            fontSize: 26,
            fontWeight: "500",
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          {title}
        </Text>
      )}
      <ActivityIndicator size="large" color="#D71E56" />
    </View>
  );
};

export default Spiner;
