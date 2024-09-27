import { FC } from "react";
import { View, Text } from "react-native";
import { IFullInfoOrderData } from "../../../../entities/history-orders/types/history-orders";
import BlockTextAndDescription from "../../block-text-and-description/BlockTextAndDescription";

type OrderSumInfoProps = {
  order: IFullInfoOrderData | undefined;
};

const OrderSumInfo: FC<OrderSumInfoProps> = ({ order }) => {
  return (
    <View style={{ marginTop: 20, rowGap: 20 }}>
      <View>
        <Text
          style={{
            color: "#272728",
            fontSize: 16,
            fontWeight: "600",
            lineHeight: 20.8,
          }}
        >
          Сумма заказа
        </Text>
      </View>

      <View>
        <Text
          style={{
            color: "#272728",
            fontSize: 14,
            fontWeight: "600",
            lineHeight: 18.2,
          }}
        >
          Итого : {order?.price_result} ₽
        </Text>
      </View>

      <BlockTextAndDescription
        text="Стоимость"
        description={`${order?.price_result} ₽`}
      />

      <BlockTextAndDescription
        text="Доставка"
        description={`${order?.delivery_result} ₽`}
      />

      {order && order.discount_result > 0 && (
        <BlockTextAndDescription
          text="Скидка"
          description={`${order?.discount_result} ₽`}
          textColor="#DE002B"
          descriptionColor="#DE002B"
        />
      )}
    </View>
  );
};

export default OrderSumInfo;
