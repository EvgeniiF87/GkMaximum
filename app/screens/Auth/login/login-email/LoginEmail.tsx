import { View, Text, TouchableOpacity } from "react-native";
import Header from "../../../../src/components/header/Header";
import { useNavigation } from "@react-navigation/native";
import BlockSocial from "../../../../src/components/block-social/BlockSocial";
import { useEffect, useState } from "react";
import { useLoginEmailMutation } from "../../../../api/Auth/AuthApi";
import { useAppDispatch, useAppSelector } from "../../../../src/hooks/redux";
import {
  setAccessToken,
  setIsAuth,
  setRefreshToken,
  setUser,
} from "../../../../store/reducers/UserSlice";
import { IResponseError } from "../../../../entities/Auth/types/auth-types";
import { AppPropsScreen } from "../../../../navigation/routes/app-navigation";
import InputPassword from "../../../../src/components/input/InputPassword";
import InputText from "../../../../src/components/input/InputText";
import { validateEmail } from "../../../../src/helpers/validation/valodation-email";
import AuthButton from "../../../../src/components/auth-button/AuthButton";
import useAppAlertNotification from "../../../../src/hooks/AppAlertNotification";
import { DevelopmentDebug } from "../../../../src/helpers/development-debug";
import Layout from "../../../../src/components/layout/Layout";
import { useAppSpiner } from "../../../../src/hooks/AppSpiner";

const titleSpiner = "Идёт вход, подождите....";

const LoginEmail = () => {
  const navigation = useNavigation<AppPropsScreen>();
  const [email, setEmail] = useState("");
  const [emailValidatin, setEmailValidatin] = useState(false);
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const { devicePushToken } = useAppSelector((state) => state.AppReducer);

  const [login] = useLoginEmailMutation();
  const dispatch = useAppDispatch();
  const { alertNotification } = useAppAlertNotification();
  const { showSpiner, hideSpiner } = useAppSpiner();

  const submitHandle = (): void => {
    setIsDisabled(true);
    showSpiner(titleSpiner);
    login({
      email,
      password,
      firebase_id: devicePushToken.length > 0 ? devicePushToken : null,
    })
      .unwrap()
      .then((data): void => {
        DevelopmentDebug(data);
        if (data?.status === "success") {
          hideSpiner();
          setIsDisabled(false);
          dispatch(setAccessToken(data.data.tokens.accessToken));
          dispatch(setRefreshToken(data?.data.tokens.refreshToken));
          dispatch(setIsAuth(true));
          dispatch(setUser(data.data.user));
          alertNotification({
            message: "Успешная авторизация",
            type: "success",
          });
          navigation.navigate("Main", {
            screen: "Tabs",
            params: { screen: "TabHome", params: { screen: "Home" } },
          });
        }
      })
      .catch((err: IResponseError) => {
        hideSpiner();
        setIsDisabled(true);
        alertNotification({ message: err?.data?.message, type: "error" });
        DevelopmentDebug(err.data);
      })
      .finally(() => hideSpiner());
  };

  const registrationScreenHandle = () => {
    navigation.navigate("Auth", {
      screen: "Registration",
    });
  };

  const changePasswordScreenHandle = () => {
    navigation.navigate("Auth", { screen: "RestoreAccessEmail", params: {} });
  };

  const onChangeEmail = (value: string) => {
    setEmail(value);
    if (validateEmail(value) || value.length === 0) setEmailValidatin(false);
    if (!validateEmail(value) && value.length > 0) setEmailValidatin(true);
  };

  useEffect(() => {
    if (validateEmail(email) && password.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password]);

  return (
    <Layout
      noMenu
      isNotification
      header={
        <Header
          title="Вход по e.mail"
          navigationHandle={() => navigation.goBack()}
          leftIcon
        />
      }
    >
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <View style={{ rowGap: 12 }}>
          <InputText
            value={email}
            onChange={onChangeEmail}
            placeholder="Почта"
            isTitle
            isValidation={emailValidatin}
            _styles={{ marginTop: 30 }}
          />
          <InputPassword
            value={password}
            onChange={setPassword}
            placeholder="Пароль"
          />
        </View>

        <View style={{ marginTop: 15 }}>
          <AuthButton
            title="Войти"
            onPressHandle={submitHandle}
            isDisabled={isDisabled}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <TouchableOpacity onPress={registrationScreenHandle}>
            <Text style={{ color: "#DE002B", fontSize: 20 }}>Регистрация</Text>
          </TouchableOpacity>
          <Text style={{ color: "#898E9F", fontSize: 20, marginHorizontal: 5 }}>
            /
          </Text>
          <TouchableOpacity onPress={changePasswordScreenHandle}>
            <Text style={{ color: "#898E9F", fontSize: 20 }}>
              Забыли пароль?
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 20, alignItems: "center" }}>
          <Text
            style={{
              fontSize: 18,
              color: "#272728",
              fontWeight: "600",
            }}
          >
            Войти через:
          </Text>
        </View>

        <BlockSocial _styles={{ marginTop: 15 }} />
      </View>
    </Layout>
  );
};

export default LoginEmail;
