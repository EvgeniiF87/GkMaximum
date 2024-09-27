import { RouteProp, useNavigation } from "@react-navigation/native";
import { SafeAreaView, TouchableOpacity, View, Text } from "react-native";
import Header from "../../../src/components/header/Header";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "../../../src/components/Icon/Icon";
import { AppIcons } from "../../../src/Icons";
import { AuthStackParamList } from "../../../navigation/auth/auth-navigation";
import { FC, useEffect, useState } from "react";
import { AppPropsScreen } from "../../../navigation/routes/app-navigation";
import useAppAlertNotification from "../../../src/hooks/AppAlertNotification";

type RegistrationSuccessProps = {
  route: RouteProp<AuthStackParamList, "RegistrationSuccess">;
};

const RegistrationSuccess: FC<RegistrationSuccessProps> = ({ route }) => {
  const { navigate } = useNavigation<AppPropsScreen>();
  const [text, setText] = useState("");
  const { type } = route.params;
  const { alertNotification } = useAppAlertNotification();

  useEffect(() => {
    if (type === "registration") {
      setText("Регистрация прошла успешно");
    }

    if (type === "RestoreAccessEmail") {
      setText("Вы успешно сменили пароль");
    }
  }, []);

  const successHandle = () => {
    alertNotification({ message: text, type: "success" });
    navigate("Main", {
      screen: "Tabs",
      params: { screen: "TabHome", params: { screen: "Home" } },
    });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header
        title=""
        navigationHandle={successHandle}
        crossIcon
        crossIconHandle={successHandle}
        leftIcon
      />
      <View style={{ justifyContent: "center", alignItems: "center", flex: 9 }}>
        <View
          style={{
            backgroundColor: "#F1F9E7",
            borderRadius: 200,
            width: 100,
            height: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon viewBox="50 35" size={70} path={AppIcons.app.checkMark()} />
        </View>

        <View style={{ paddingHorizontal: 40 }}>
          <Text
            style={{
              marginTop: 30,
              textAlign: "center",
              fontSize: 24,
              color: "#272728",
              fontWeight: "600",
            }}
          >
            {text}
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          borderTopColor: "#898E9F",
          borderTopWidth: 0.2,
        }}
      >
        <TouchableOpacity style={{ marginTop: 8 }} onPress={successHandle}>
          <LinearGradient
            colors={["#DE002B", "#D71E56"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ borderRadius: 30, paddingVertical: 17 }}
          >
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                fontSize: 20,
                fontWeight: "600",
              }}
            >
              Закрыть
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RegistrationSuccess;
