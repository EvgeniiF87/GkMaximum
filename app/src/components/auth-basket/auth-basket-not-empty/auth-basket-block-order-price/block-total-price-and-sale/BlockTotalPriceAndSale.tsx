import { FC } from "react";
import { View, Text } from "react-native";
import BlockTextAndDescription from "../../../../block-text-and-description/BlockTextAndDescription";

type BlockTotalPriceAndSaleProps = {
  totalPrice: number;
  price: number;
  sale: number;
  totalPay: number;
};

const BlockTotalPriceAndSale: FC<BlockTotalPriceAndSaleProps> = ({
  totalPrice,
  price,
  sale,
  totalPay,
}) => {
  return (
    <>
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            lineHeight: 18.2,
            color: "#272728",
          }}
        >
          Сумма заказа: {totalPrice} ₽
        </Text>
      </View>

      <View style={{ marginTop: 20, rowGap: 20 }}>
        <BlockTextAndDescription text="Стоимость" description={`${price} ₽`} />

        {sale > 0 && (
          <BlockTextAndDescription
            text="Скидка"
            description={`${sale} ₽`}
            textColor="#DE002B"
            descriptionColor="#DE002B"
          />
        )}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              lineHeight: 18.2,
              color: "#272728",
            }}
          >
            Итого к оплате: {totalPay} ₽
          </Text>
        </View>
      </View>
    </>
  );
};

export default BlockTotalPriceAndSale;
