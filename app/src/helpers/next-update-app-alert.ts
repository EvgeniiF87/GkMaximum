import { Alert } from "react-native";

export const nextUpdateAppAlert = () => {
  Alert.alert(
    "Информация",
    "Данный функционал будет реализован в следующем обновлении!",
    [
      {
        text: "Понятно",
        onPress: () => {},
      },
    ]
  );
};
