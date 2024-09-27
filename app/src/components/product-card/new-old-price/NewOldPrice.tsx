import { FC } from "react";
import { View, Text } from "react-native";

type NewOldPriceProps = {
  oldPrice: number;
  newPrice: number;
  oldPriceFontSize?: number;
  newPriceFontSize?: number;
  fontWeight?:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900"
    | undefined;
};

const NewOldPrice: FC<NewOldPriceProps> = ({
  oldPrice,
  newPrice,
  oldPriceFontSize,
  newPriceFontSize,
  fontWeight,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      <View>
        <Text
          style={{
            fontSize: oldPriceFontSize ? oldPriceFontSize : 11,
            letterSpacing: -1.3,
            color: "#898E9F",
            textDecorationLine: "line-through",
          }}
        >
          {oldPrice}₽
        </Text>
      </View>

      <Text
        style={{
          fontSize: newPriceFontSize ? newPriceFontSize : 16,
          letterSpacing: -0.4,
          color: "#DE002B",
          fontWeight: fontWeight ? fontWeight : "700",
        }}
      >
        {newPrice} ₽
      </Text>
    </View>
  );
};

export default NewOldPrice;
