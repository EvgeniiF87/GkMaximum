import { View, Text } from "react-native";
import { useAppSelector } from "../../../../hooks/redux";

const AuthBasketHeaderAndAllCount = () => {
  const { products, count } = useAppSelector((state) => state.basketReducer);
  return (
    <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          lineHeight: 23.4,
          color: "#272728",
        }}
      >
        Корзина
      </Text>

      <Text
        style={{
          fontSize: 14,
          fontWeight: "400",
          lineHeight: 22.4,
          color: "#272728",
        }}
      >
        Количество товаров: {count} шт.
      </Text>
    </View>
  );
};

export default AuthBasketHeaderAndAllCount;
