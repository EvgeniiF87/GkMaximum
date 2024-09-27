import { View, Text, Platform } from "react-native";
import { useAppSelector } from "../../hooks/redux";

export const BasketCounterBadges = () => {
  const { count } = useAppSelector((state) => state.basketReducer);
  return (
    <View
      style={[
        Platform.select({
          ios: {
            position: "absolute",
            top: -1,
            left: "16%",
            width: 16,
            height: 16,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#DE002B",
            borderRadius: 30,
            zIndex: 1,
          },
          android: {
            position: "absolute",
            top: -1,
            left: "15%",
            width: 16,
            height: 16,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#DE002B",
            borderRadius: 30,
            zIndex: 1,
          },
        }),
      ]}
    >
      <Text style={{ color: "#fff", fontSize: 8, fontWeight: "800" }}>
        {count}
      </Text>
    </View>
  );
};
