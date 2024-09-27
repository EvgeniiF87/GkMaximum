import { FC } from "react";
import { View, Text } from "react-native";

type BlockToPayProps = {
  totalPrice: number;
  price: number;
  sale: number;
};

const BlockToPay: FC<BlockToPayProps> = ({ price, totalPrice, sale }) => {
  return (
    <View
      style={{
        marginTop: 60,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "400",
          lineHeight: 20.8,
          color: "#272728",
        }}
      >
        К оплате:
      </Text>
      <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
        <Text
          style={{
            fontSize: sale > 0 ? 14 : 16,
            fontWeight: sale > 0 ? "400" : "600",
            lineHeight: sale > 0 ? 18.2 : 20.8,
            color: sale === 0 ? "#272728" : "#898E9F",
            textDecorationLine: sale > 0 ? "line-through" : "none",
          }}
        >
          {totalPrice} ₽
        </Text>

        {sale > 0 && (
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              lineHeight: 20.8,
              color: "#DE002B",
              marginLeft: 8,
            }}
          >
            {price} ₽
          </Text>
        )}
      </View>
    </View>
  );
};

export default BlockToPay;
