import { View, Text } from "react-native";
import { Icon } from "../Icon/Icon";
import { AppIcons } from "../../Icons";
import ButtonOutline from "../../ui/ButtonOutline.tsx/ButtonOutline";
import { useNavigation } from "@react-navigation/native";
import { AppPropsScreen } from "../../../navigation/routes/app-navigation";
import Layout from "../layout/Layout";

const NotAuthBasket = () => {
  const { navigate } = useNavigation<AppPropsScreen>();
  const onPressHandle = () => {
    navigate("Main", {
      screen: "Tabs",
      params: { screen: "TabProfile", params: { screen: "Profile" } },
    });
  };
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
            Необходимо <Text style={{ color: "#DE002B" }}>авторизоваться</Text>,
            чтобы добовлять товар в корзину, а так же получать эксклюзивные
            скидки и бонусы.
          </Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <Icon viewBox="43 33" size={43} path={AppIcons.app.bigBasket()} />
        </View>

        <View
          style={{
            marginTop: 20,
            width: "100%",
            paddingHorizontal: 20,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <ButtonOutline
            title="Авторизоваться"
            type={"dark"}
            onPressHandle={onPressHandle}
            _styles={{ flex: 1 }}
          />
        </View>
      </View>
    </Layout>
  );
};

export default NotAuthBasket;
