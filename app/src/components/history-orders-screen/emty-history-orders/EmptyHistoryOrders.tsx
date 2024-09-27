import { View, Text, Dimensions } from "react-native";
import { Icon } from "../../Icon/Icon";
import { AppIcons } from "../../../Icons";

const EmptyHistoryOrders = () => {
  const { width } = Dimensions.get("window");

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: width - 140,
      }}
    >
      <View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "400",
            color: "#272728",
            lineHeight: 23.4,
          }}
        >
          Заказов пока нет...
        </Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <Icon
          viewBox="43 33"
          size={43}
          path={AppIcons.app.bigBasket("#272728")}
        />
      </View>

      <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "300",
            color: "#272728",
            textAlign: "center",
            lineHeight: 20.8,
          }}
        >
          Вы можете перейти в корзину и оформить заказ
        </Text>
      </View>
    </View>
  );
};

export default EmptyHistoryOrders;
