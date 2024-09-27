import { FC } from "react";
import { View, Text, Image } from "react-native";
import {
  IPriceData,
  statusType,
} from "../../../../entities/history-orders/types/history-orders";
import { devApiImgUrl } from "../../../../api/config/config";
import ButtonOutline from "../../../ui/ButtonOutline.tsx/ButtonOutline";
import { useNavigation } from "@react-navigation/native";
import { AppPropsScreen } from "../../../../navigation/routes/app-navigation";

type OrderProductInfoCardProps = {
  product: IPriceData;
  status: statusType;
};

const OrderProductInfoCard: FC<OrderProductInfoCardProps> = ({
  product,
  status,
}) => {
  const productTitle =
    product.title.length > 20
      ? product.title.substring(0, 20) + "..."
      : product.title;

  const productDescription =
    product.description !== null && product.description.length > 25
      ? product.description.substring(0, 25) + "..."
      : product.description;

  const { navigate } = useNavigation<AppPropsScreen>();

  const leaveFeedbackHandle = () => {
    navigate("LeaveFeedBack", { product });
  };

  return (
    <View
      style={{
        paddingHorizontal: 20,
        borderBottomWidth: 0.7,
        paddingBottom: 10,
        borderColor: "#D1D3DE",
        marginTop: 10,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{ uri: `${devApiImgUrl}/${product.img}` }}
          style={{ width: 93, height: 83, resizeMode: "cover" }}
        />

        <View style={{ marginLeft: 10, rowGap: 10, alignItems: "flex-start" }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              lineHeight: 18.2,
              color: "#272728",
            }}
          >
            {productTitle}
          </Text>

          {product.description && (
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                lineHeight: 15.6,
                color: "#272728",
              }}
            >
              {productDescription}
            </Text>
          )}

          <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
            <Text
              style={{
                fontSize: product.price_discount ? 14 : 16,
                fontWeight: product.price_discount ? "400" : "600",
                lineHeight: product.price_discount ? 22.4 : 20.8,
                color: product.price_discount ? "#898E9F" : "#272728",
                textDecorationLine: product.price_discount
                  ? "line-through"
                  : "none",
              }}
            >
              {product.price} ₽
            </Text>

            {product.price_discount && (
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  lineHeight: 20.8,
                  color: "#DE002B",
                  marginLeft: 8,
                }}
              >
                {product.price_discount} ₽
              </Text>
            )}
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: status == "Доставлен" ? 0 : 10,
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontWeight: "400",
            lineHeight: 15.6,
            color: "#898E9F",
          }}
        >
          {product.variable_units} {product.description_units}
        </Text>

        {status === "Доставлен" && (
          <ButtonOutline
            title="оставить отзыв"
            uppercase
            paddingHorizontal={6}
            paddingVertical={6}
            fontSize={10}
            onPressHandle={leaveFeedbackHandle}
            type={"dark"}
            _styles={{ flex: 0 }}
          />
        )}
      </View>
    </View>
  );
};

export default OrderProductInfoCard;
