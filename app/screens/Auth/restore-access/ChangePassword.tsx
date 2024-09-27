import { FC, useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Header from "../../../src/components/header/Header";
import BlockSocial from "../../../src/components/block-social/BlockSocial";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../../../navigation/auth/auth-navigation";
import { useChangePasswordResetMutation } from "../../../api/Auth/AuthApi";
import InputPassword from "../../../src/components/input/InputPassword";
import {
  IResponse,
  IResponseError,
} from "../../../entities/Auth/types/auth-types";
import AuthButton from "../../../src/components/auth-button/AuthButton";
import { AppPropsScreen } from "../../../navigation/routes/app-navigation";
import useAppAlertNotification from "../../../src/hooks/AppAlertNotification";
import { DevelopmentDebug } from "../../../src/helpers/development-debug";
import Layout from "../../../src/components/layout/Layout";
import { useChangePasswordUserMutation } from "../../../api/User/UserApi";
import {
  IUserErrorAuthResponse,
  IUserRestoreAccessResponse,
} from "../../../entities/User/types/user-types";
import { useAppDispatch } from "../../../src/hooks/redux";
import {
  setAccessToken,
  setRefreshToken,
} from "../../../store/reducers/UserSlice";
import { useAppSpiner } from "../../../src/hooks/AppSpiner";

type ChangePasswordProps = {
  route: RouteProp<AuthStackParamList, "ChangePassword">;
};

const titleSpiner = "Идёт сохранение данных. Подождите...";

const ChangePassword: FC<ChangePasswordProps> = ({ route }) => {
  const { navigate, goBack } = useNavigation<AppPropsScreen>();
  const { type } = route.params;
  const code = route.params?.code ? route.params?.code : undefined;
  const dispatch = useAppDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const [changePasswordReset] = useChangePasswordResetMutation();
  const [changePasswordUser] = useChangePasswordUserMutation();
  const { alertNotification } = useAppAlertNotification();
  const { showSpiner, hideSpiner } = useAppSpiner();

  const goBackHandle = () => {
    if ((type && type === "UserInfo") || type === "UserInfoRestoreAccess") {
      navigate("UserInfo");
    } else {
      navigate("Main", {
        screen: "Tabs",
        params: { screen: "TabProfile", params: { screen: "Profile" } },
      });
    }
  };

  const userRestoreAccessEmailHandle = () => {
    navigate("Auth", {
      screen: "RestoreAccessEmail",
      params: { type: "UserInfo" },
    });
  };

  const onPressHandle = () => {
    if (type && type === "UserInfo") {
      showSpiner(titleSpiner);
      changePasswordUser({ oldPassword, newPassword: password })
        .unwrap()
        .then((response): void => {
          if (response.status === "success") {
            DevelopmentDebug(response);
            hideSpiner();
            goBack();
            alertNotification({
              message: "Ваш пароль успешно изменён",
              type: "success",
            });
          }
        })
        .catch((err: IUserErrorAuthResponse): void => {
          hideSpiner();
          DevelopmentDebug({ err });
          alertNotification({
            message: err.data.message,
            type: "error",
          });
        })
        .finally(() => hideSpiner());
    } else if (type === "UserInfoRestoreAccess") {
      showSpiner(titleSpiner);
      changePasswordReset({ code, password, repeat_password: confirmPassword })
        .unwrap()
        .then((response: IUserRestoreAccessResponse): void => {
          if (response.status === "success") {
            DevelopmentDebug(response);
            hideSpiner();
            dispatch(setAccessToken(response.data.result.tokens.accessToken));
            dispatch(setRefreshToken(response.data.result.tokens.refreshToken));
            goBack();
            alertNotification({
              message: "Ваш пароль успешно изменён",
              type: "success",
            });
          }
        })
        .catch((err: IResponseError) => {
          hideSpiner();
          alertNotification({ message: err?.data?.message, type: "error" });
          DevelopmentDebug(err.data);
        })
        .finally(() => hideSpiner());
    } else {
      showSpiner(titleSpiner);
      changePasswordReset({ code, password, repeat_password: confirmPassword })
        .unwrap()
        .then((response: IResponse) => {
          if (response.status === "success") {
            hideSpiner();
            navigate("Auth", {
              screen: "RegistrationSuccess",
              params: { type: "RestoreAccessEmail" },
            });
          }
        })
        .catch((err: IResponseError) => {
          hideSpiner();
          alertNotification({ message: err?.data?.message, type: "error" });
          DevelopmentDebug(err.data);
        })
        .finally(() => hideSpiner());
    }
  };

  useEffect(() => {
    if (type === "UserInfo") {
      if (
        password.length > 0 &&
        confirmPassword.length > 0 &&
        oldPassword.length > 0 &&
        password === confirmPassword
      ) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }

      if (
        password.length &&
        confirmPassword.length &&
        password !== confirmPassword
      ) {
        if (password.length === confirmPassword.length) {
          alertNotification({
            message: "Пароли не совпадают",
            type: "error",
          });
        }
      }
    } else {
      if (
        password.length > 0 &&
        confirmPassword.length > 0 &&
        password === confirmPassword
      ) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }

      if (
        password.length &&
        confirmPassword.length &&
        password !== confirmPassword
      ) {
        if (password.length === confirmPassword.length) {
          alertNotification({
            message: "Пароли не совпадают",
            type: "error",
          });
        }
      }
    }
  }, [password, confirmPassword, oldPassword, route]);

  return (
    <Layout
      noMenu
      isNotification
      header={
        <Header
          title={
            type && type === "UserInfo"
              ? "Сменить пароль"
              : "Восстановить доступ"
          }
          navigationHandle={goBackHandle}
          leftIcon
        />
      }
    >
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        {type && type === "UserInfo" && (
          <>
            <View style={{ marginTop: 30 }}>
              <Text
                style={{
                  fontSize: 18,
                  color: "#272728",
                  fontWeight: "600",
                }}
              >
                Введите старый пароль:
              </Text>
            </View>

            <InputPassword
              value={oldPassword}
              onChange={setOldPassword}
              placeholder="Пароль"
              _styles={{ marginTop: 20 }}
            />
          </>
        )}

        <View style={{ marginTop: type && type === "UserInfo" ? 40 : 30 }}>
          <Text
            style={{
              fontSize: 18,
              color: "#272728",
              fontWeight: "600",
            }}
          >
            Придумайте новый пароль:
          </Text>
        </View>

        <InputPassword
          value={password}
          onChange={setPassword}
          placeholder="Пароль"
          _styles={{ marginTop: 20 }}
        />

        <InputPassword
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="Пароль"
          isConfirm
          _styles={{ marginTop: 20 }}
        />

        <View style={{ marginTop: 15 }}>
          <AuthButton
            title="Сменить пароль"
            onPressHandle={onPressHandle}
            isDisabled={isDisabled}
          />
        </View>

        {type && type === "UserInfo" ? (
          <TouchableOpacity
            onPress={userRestoreAccessEmailHandle}
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text style={{ color: "#898E9F", fontSize: 18, fontWeight: "400" }}>
              Забыли пароль?
            </Text>
          </TouchableOpacity>
        ) : (
          <>
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
          </>
        )}
      </View>
    </Layout>
  );
};

export default ChangePassword;
