import { FC, useEffect, useState } from "react";
import { View, Text } from "react-native";
import Header from "../../../src/components/header/Header";
import BlockSocial from "../../../src/components/block-social/BlockSocial";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { useChangePasswordMutation } from "../../../api/Auth/AuthApi";
import InputText from "../../../src/components/input/InputText";
import { validateEmail } from "../../../src/helpers/validation/valodation-email";
import { IResponseError } from "../../../entities/Auth/types/auth-types";
import { AppPropsScreen } from "../../../navigation/routes/app-navigation";
import AuthButton from "../../../src/components/auth-button/AuthButton";
import useAppAlertNotification from "../../../src/hooks/AppAlertNotification";
import { DevelopmentDebug } from "../../../src/helpers/development-debug";
import Layout from "../../../src/components/layout/Layout";
import { useAppSelector } from "../../../src/hooks/redux";
import { AuthStackParamList } from "../../../navigation/auth/auth-navigation";
import { useAppSpiner } from "../../../src/hooks/AppSpiner";

type RestoreAccessEmailProps = {
  route: RouteProp<AuthStackParamList, "RestoreAccessEmail">;
};

const titleSpiner = "Идёт проверка вашей почты. Подождите...";

const RestoreAccessEmail: FC<RestoreAccessEmailProps> = ({ route }) => {
  const { navigate, goBack } = useNavigation<AppPropsScreen>();
  const type = route?.params?.type ? route?.params?.type : undefined;
  const { user } = useAppSelector((state) => state.userReducer);
  const [email, setEmail] = useState(
    type && type === "UserInfo" ? user.email : ""
  );
  const [emailValidatin, setEmailValidatin] = useState(false);
  const [emailServerError, setEmailServerError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const [changePassword] = useChangePasswordMutation();
  const { alertNotification } = useAppAlertNotification();
  const { showSpiner, hideSpiner } = useAppSpiner();

  const getCodeHandle = (): void => {
    showSpiner(titleSpiner);
    setIsDisabled(true);
    changePassword({ email: email ? email : "" })
      .unwrap()
      .then((data) => {
        if (data.status === "success") {
          hideSpiner();
          if (type && type === "UserInfo") {
            navigate("Auth", {
              screen: "CheckCode",
              params: { email, type: "UserInfo" },
            });
          } else {
            navigate("Auth", {
              screen: "CheckCode",
              params: { email, type: "RestoreAccessEmail" },
            });
          }
        }
      })
      .catch((err: IResponseError) => {
        setEmailServerError(true);
        hideSpiner();
        alertNotification({ message: err?.data?.message, type: "error" });
        DevelopmentDebug(err.data);
      })
      .finally(() => hideSpiner());
  };

  const onChangeEmail = (value: string) => {
    setEmail(value);
    if (validateEmail(value) || value.length === 0) setEmailValidatin(false);
    if (!validateEmail(value) && value.length > 0) setEmailValidatin(true);
    if (validateEmail(value) && value.length > 0) setIsDisabled(false);
  };

  const onFocusEmail = () => {
    setEmailServerError(false);
  };

  useEffect(() => {
    if (type === "UserInfo") setIsDisabled(false);
  }, [route]);

  return (
    <Layout
      noMenu
      isNotification
      header={
        <Header
          title="Восстановить доступ"
          navigationHandle={() => goBack()}
          leftIcon
        />
      }
    >
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <View style={{ rowGap: 12 }}>
          <InputText
            value={email}
            onChange={onChangeEmail}
            focusHandle={onFocusEmail}
            placeholder="Почта"
            isTitle
            isValidation={emailValidatin}
            isServerError={emailServerError}
            _styles={{ marginTop: 30 }}
          />
        </View>

        <View style={{ marginTop: 15 }}>
          <AuthButton
            title="Получить код для смены пароля"
            onPressHandle={getCodeHandle}
            isDisabled={isDisabled}
          />
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

export default RestoreAccessEmail;
