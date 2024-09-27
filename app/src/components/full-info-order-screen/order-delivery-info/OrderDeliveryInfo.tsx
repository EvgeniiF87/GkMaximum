import { FC } from "react";
import { View, Text } from "react-native";
import { IFullInfoOrderData } from "../../../../entities/history-orders/types/history-orders";
import { convertDateToDayAndMonth } from "../../../helpers/convert-date";

type OrderDeliveryInfoProps = {
  order: IFullInfoOrderData | undefined;
};

const OrderDeliveryInfo: FC<OrderDeliveryInfoProps> = ({ order }) => {
  return (
    <View>
      <View style={{ rowGap: 10 }}>
        <Text
          style={{
            color: "#272728",
            fontSize: 16,
            fontWeight: "600",
            lineHeight: 20.8,
          }}
        >
          Информация о заказе
        </Text>
      </View>

      {order?.date_delivery && (
        <View style={{ rowGap: 10, marginTop: 20 }}>
          <Text
            style={{
              color: "#272728",
              fontSize: 12,
              fontWeight: "600",
              lineHeight: 15.6,
            }}
          >
            Дата доставки:
          </Text>
          <Text
            style={{
              color: "#272728",
              fontSize: 14,
              fontWeight: "400",
              lineHeight: 22.4,
            }}
          >
            {convertDateToDayAndMonth(order?.date_delivery)}
          </Text>
        </View>
      )}

      <View style={{ rowGap: 10, marginTop: 20 }}>
        <Text
          style={{
            color: "#272728",
            fontSize: 12,
            fontWeight: "600",
            lineHeight: 15.6,
          }}
        >
          Способ доставки:
        </Text>
        <Text
          style={{
            color: "#272728",
            fontSize: 14,
            fontWeight: "400",
            lineHeight: 22.4,
          }}
        >
          Курьерская доставка
        </Text>
      </View>

      <View style={{ rowGap: 10, marginTop: 20 }}>
        <Text
          style={{
            color: "#272728",
            fontSize: 12,
            fontWeight: "600",
            lineHeight: 15.6,
          }}
        >
          Адрес доставки:
        </Text>
        <Text
          style={{
            color: "#272728",
            fontSize: 14,
            fontWeight: "400",
            lineHeight: 22.4,
          }}
        >
          {order?.address_delivery.house_street},{" "}
          {order?.address_delivery.entrance &&
            `под. ${order?.address_delivery.entrance}`}
          ,{" "}
          {order?.address_delivery.flat && `кв ${order?.address_delivery.flat}`}
          ,{" "}
          {order?.address_delivery.floor &&
            `этаж ${order?.address_delivery.floor}`}
        </Text>
      </View>
    </View>
  );
};

export default OrderDeliveryInfo;
