import { Alert } from "react-native";

export const orderAlert = (goBack: () => void) => {
  Alert.alert(
    "Оформление заказа",
    "Наш менеджер свяжется с Вами в ближайшее время",
    [
      {
        text: "Закрыть",
        onPress: goBack,
      },
    ]
  );
};
