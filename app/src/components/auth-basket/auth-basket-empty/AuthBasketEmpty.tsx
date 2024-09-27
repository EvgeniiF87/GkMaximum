import { View, Text } from "react-native";
import { Icon } from "../../Icon/Icon";
import { AppIcons } from "../../../Icons";
import Layout from "../../layout/Layout";

const AuthBasketEmpty = () => {
  return (
    <Layout isEmpty>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "500",
              color: "#272728",
            }}
          >
            Пока тут пусто
          </Text>
        </View>

        <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "300",
              color: "#272728",
              textAlign: "center",
            }}
          >
            Добавляйте понравившиеся товары и оформляйте заказ в пару кликов!
          </Text>
        </View>

        <View style={{ marginTop: 10 }}>
          <Icon viewBox="43 33" size={43} path={AppIcons.app.bigBasket()} />
        </View>
      </View>
    </Layout>
  );
};

export default AuthBasketEmpty;
