import { FC } from "react";
import { View, Text, Image } from "react-native";
import { devApiImgUrl } from "../../../../api/config/config";
import { IPriceData } from "../../../../entities/history-orders/types/history-orders";

type LeaveFeedbackProductCardProps = {
  product: IPriceData;
};

const LeaveFeedbackProductCard: FC<LeaveFeedbackProductCardProps> = ({
  product,
}) => {
  const productTitle =
    product.title.length > 20
      ? product.title.substring(0, 20) + "..."
      : product.title;

  const productDescription =
    product.description && product.description.length > 25
      ? product.description.substring(0, 25) + "..."
      : product.description;

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
                fontSize: 12,
                fontWeight: "400",
                lineHeight: 15.6,
                color: "#898E9F",
              }}
            >
              500 мл
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LeaveFeedbackProductCard;
