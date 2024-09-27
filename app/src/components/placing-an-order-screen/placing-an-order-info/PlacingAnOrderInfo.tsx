import { View, Text } from "react-native";
import { useAppSelector } from "../../../hooks/redux";

const PlacingAnOrderInfo = () => {
  const { address_delivery } = useAppSelector((state) => state.OrderReducer);
  return (
    <View
      style={{
        paddingHorizontal: 20,
        marginTop: 50,
        rowGap: 15,
        paddingBottom: 100,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "600",
          lineHeight: 20.8,
          color: "#272728",
        }}
      >
        Информация о заказе
      </Text>

      <View>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "600",
            lineHeight: 15.6,
            color: "#272728",
          }}
        >
          Способ доставки:
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "400",
            lineHeight: 22.4,
            color: "#272728",
          }}
        >
          Курьерская доставка
        </Text>
      </View>

      <View>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "600",
            lineHeight: 15.6,
            color: "#272728",
          }}
        >
          Адрес доставки:
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {address_delivery.house_street.length > 0 && (
            <Text
              style={{
                fontSize: 14,
                fontWeight: "400",
                lineHeight: 22.4,
                color: "#272728",
              }}
            >
              {address_delivery.house_street},{" "}
            </Text>
          )}
          {address_delivery.entrance.length > 0 && (
            <Text
              style={{
                fontSize: 14,
                fontWeight: "400",
                lineHeight: 22.4,
                color: "#272728",
              }}
            >
              под. {address_delivery.entrance},{" "}
            </Text>
          )}
          {address_delivery.flat.length > 0 && (
            <Text
              style={{
                fontSize: 14,
                fontWeight: "400",
                lineHeight: 22.4,
                color: "#272728",
              }}
            >
              кв {address_delivery.flat},{" "}
            </Text>
          )}
          {address_delivery.floor.length > 0 && (
            <Text
              style={{
                fontSize: 14,
                fontWeight: "400",
                lineHeight: 22.4,
                color: "#272728",
              }}
            >
              этаж {address_delivery.floor}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default PlacingAnOrderInfo;
