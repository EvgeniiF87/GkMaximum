import { FC } from "react";
import { Dimensions, TouchableOpacity, View, Text } from "react-native";
import { useAppDispatch } from "../../../hooks/redux";
import { useNavigation } from "@react-navigation/native";
import ButtonGradient from "../../../ui/button-gradient/ButtonGradient";
import { Icon } from "../../Icon/Icon";
import { AppIcons } from "../../../Icons";
import { AppPropsScreen } from "../../../../navigation/routes/app-navigation";
import { resetAppAlert } from "../../../../store/reducers/AppSlice";

const { width } = Dimensions.get("window");

type AlertType = "favorite" | "notification" | "basket";

type NotAuthProductProps = {
  type: AlertType;
};

const NotAuthProduct: FC<NotAuthProductProps> = ({ type }) => {
  const { navigate } = useNavigation<AppPropsScreen>();

  const alertType: AlertType = type as AlertType;

  const typeText = {
    favorite: "для добавления товара в избранное",
    notification: "для получения уведомлений",
    basket: "для добавления товара в корзину",
  };

  const dispatch = useAppDispatch();

  const closeModalHandle = () => {
    dispatch(resetAppAlert());
  };

  const authHandle = () => {
    dispatch(resetAppAlert());
    navigate("Main", {
      screen: "Tabs",
      params: { screen: "TabProfile", params: { screen: "Profile" } },
    });
  };

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1,
        backgroundColor: "rgba(22, 22, 28, 0.3)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 400,
      }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 20,
          width: width - 40,
          paddingHorizontal: 10,
          paddingVertical: 20,
        }}
      >
        <TouchableOpacity
          style={{ alignItems: "flex-end" }}
          onPress={closeModalHandle}
        >
          <Icon viewBox="24 24" size={24} path={AppIcons.app.cross()} />
        </TouchableOpacity>

        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              color: "#272728",
              textAlign: "center",
              fontSize: 18,
              fontWeight: "600",
              lineHeight: 23.4,
            }}
          >
            Необходимо пройти{" "}
            <Text
              style={{
                color: "#DE002B",
                textAlign: "center",
                fontSize: 18,
                fontWeight: "600",
                lineHeight: 23.4,
              }}
            >
              авторизацию
            </Text>{" "}
            {typeText[alertType] || ""}
          </Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <ButtonGradient
            title="Авторизоваться"
            flex={0}
            onPressHandle={authHandle}
          />
        </View>
      </View>
    </View>
  );
};

export default NotAuthProduct;
