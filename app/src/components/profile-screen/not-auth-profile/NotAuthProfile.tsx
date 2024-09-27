import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useLoginPhoneMutation } from "../../../../api/Auth/AuthApi";
import { IResponseError } from "../../../../entities/Auth/types/auth-types";
import { AppPropsScreen } from "../../../../navigation/routes/app-navigation";
import { DevelopmentDebug } from "../../../helpers/development-debug";
import useAppAlertNotification from "../../../hooks/AppAlertNotification";
import AuthButton from "../../auth-button/AuthButton";
import BlockArrowRight from "../../block-arrow-right/BlockArrowRight";
import BlockSocial from "../../block-social/BlockSocial";
import InputPhone from "../../input/InputPhone";

const NotAuthProfile = () => {
  const navigation = useNavigation<AppPropsScreen>();
  const { alertNotification } = useAppAlertNotification();

  const [phone, setPhone] = useState("");
  const [phoneFormat, setPhoneFormat] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const [login] = useLoginPhoneMutation({});

  const onPressHandle = async () => {
    await login({ phone })
      .unwrap()
      .then((data) => {
        if (data?.status === "success") {
          setPhone("");
          setPhoneFormat("");
          navigation.navigate("Auth", {
            screen: "CheckCode",
            params: { phone, phoneFormat, type: "login" },
          });
        }
      })
      .catch((err: IResponseError) => {
        alertNotification({ message: err?.data?.message, type: "error" });
        DevelopmentDebug(err.data);
      });
  };

  const loginEmailHandle = () => {
    navigation.navigate("Auth", {
      screen: "LoginEmail",
    });
  };

  const RestoreAccessEmailHandle = () => {
    navigation.navigate("Auth", {
      screen: "RestoreAccessEmail",
      params: {},
    });
  };

  useEffect(() => {
    if (phone.length > 0 && phone.length === 11) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [phone]);

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          marginTop: 40,
          alignItems: "center",
        }}
      >
        <View style={{ borderBottomColor: "#DE002B", borderBottomWidth: 0.8 }}>
          <Text
            style={{
              fontSize: 18,
              color: "#272728",
              fontWeight: "600",
              paddingBottom: 2,
            }}
          >
            Вход
          </Text>
        </View>
        <TouchableOpacity
          style={{ marginLeft: 20 }}
          onPress={() =>
            navigation.navigate("Auth", {
              screen: "Registration",
            })
          }
        >
          <Text style={{ fontSize: 18, color: "#898E9F", fontWeight: "600" }}>
            Регистрация
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
        <Text style={{ fontSize: 15, fontWeight: "400", color: "#272728" }}>
          Чтобы оформлять заказы и пользоваться скидками авторизуйтесь в
          приложение!
        </Text>
      </View>
      <View style={{ paddingHorizontal: 20, marginTop: 18 }}>
        <Text style={{ fontSize: 12 }}>Ваш номер телефона</Text>
        <InputPhone
          value={phoneFormat}
          setPhone={setPhone}
          setPhoneFormat={setPhoneFormat}
          placeholder="+7 (__) ___-__-__"
        />
      </View>
      <View style={{ paddingHorizontal: 20, marginTop: 15 }}>
        <AuthButton
          title="Получить код"
          onPressHandle={onPressHandle}
          isDisabled={isDisabled}
        />
      </View>
      <View
        style={{ paddingHorizontal: 20, alignItems: "center", marginTop: 20 }}
      >
        <View>
          <Text>Либо войдите в систему через:</Text>
        </View>

        <BlockSocial _styles={{ marginTop: 10 }} />
      </View>
      <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
        <BlockArrowRight
          title="Войти по email"
          titleFontSize={16}
          paddingHorizontal={0}
          marginVertical={8}
          navigationHandle={loginEmailHandle}
        />
        <BlockArrowRight
          title="Восстановить доступ"
          titleFontSize={16}
          paddingHorizontal={0}
          marginVertical={8}
          navigationHandle={RestoreAccessEmailHandle}
        />
      </View>
    </>
  );
};

export default NotAuthProfile;
