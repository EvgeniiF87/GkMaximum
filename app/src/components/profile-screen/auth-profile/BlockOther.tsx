import { View } from "react-native";
import BlockArrowRight from "../../block-arrow-right/BlockArrowRight";
import { useNavigation } from "@react-navigation/native";
import { AppPropsScreen } from "../../../../navigation/routes/app-navigation";
import { useAppSelector } from "../../../hooks/redux";

const BlockOther = () => {
  const { navigate } = useNavigation<AppPropsScreen>();
  const { user } = useAppSelector((state) => state.userReducer);

  const historyOrders = () => {
    navigate("Main", {
      screen: "Tabs",
      params: {
        screen: "TabProfile",
        params: { screen: "HistoryOrders" },
      },
    });
  };

  const vexelAndDelivery = () => {
    navigate("Main", {
      screen: "Tabs",
      params: {
        screen: "TabProfile",
        params: { screen: "VexelAndDelivery" },
      },
    });
  };

  const purchaseReturns = () => {
    navigate("Main", {
      screen: "Tabs",
      params: {
        screen: "TabProfile",
        params: { screen: "PurchaseReturns" },
      },
    });
  };

  const myAddresses = () => {
    navigate("Main", {
      screen: "Tabs",
      params: {
        screen: "TabProfile",
        params: { screen: "MyAddresses" },
      },
    });
  };

  const termsOfUse = () => {
    navigate("Main", {
      screen: "Tabs",
      params: {
        screen: "TabProfile",
        params: { screen: "TermsOfUse" },
      },
    });
  };

  return (
    <View
      style={{
        borderColor: "#898E9F",
        borderTopWidth: 0.2,
        borderBottomWidth: 0.2,
        marginTop: 5,
      }}
    >
      <BlockArrowRight
        title="История заказов"
        titleFontSize={16}
        navigationHandle={historyOrders}
      />
      <BlockArrowRight
        title="Мои адреса"
        titleFontSize={16}
        navigationHandle={myAddresses}
      />
      <BlockArrowRight
        title={user.id !== 169 ? "Доставка и оплата" : "Доставка"}
        titleFontSize={16}
        navigationHandle={vexelAndDelivery}
      />
      <BlockArrowRight
        title="Возврат товара"
        titleFontSize={16}
        navigationHandle={purchaseReturns}
      />
      <BlockArrowRight
        title="Пользовательское соглашение"
        titleFontSize={16}
        navigationHandle={termsOfUse}
      />
    </View>
  );
};

export default BlockOther;
