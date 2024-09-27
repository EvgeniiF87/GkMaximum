import { useNavigation } from "@react-navigation/native";
import Header from "../../../src/components/header/Header";
import Layout from "../../../src/components/layout/Layout";
import { AppPropsScreen } from "../../../navigation/routes/app-navigation";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import PersonalInformation from "../../../src/components/user-info-screen/PersonalInformation";
import ContactDetails from "../../../src/components/user-info-screen/ContactDetails";
import BlockBottomButtons from "../../../src/components/BlockBottomButtons/BlockBottomButtons";
import ButtonOutline from "../../../src/ui/ButtonOutline.tsx/ButtonOutline";
import UserAvatar from "../../../src/components/user-info-screen/UserAvatar";
import {
  useLazyGetUserInfoQuery,
  useUpdateUserInfoMutation,
} from "../../../api/User/UserApi";
import useAppAlertNotification from "../../../src/hooks/AppAlertNotification";
import {
  IUpdateUserInfoRequest,
  IUserErrorAuthResponse,
  IUserErrorResponse,
} from "../../../entities/User/types/user-types";
import { DevelopmentDebug } from "../../../src/helpers/development-debug";
import { useAppDispatch, useAppSelector } from "../../../src/hooks/redux";
import { setUser } from "../../../store/reducers/UserSlice";
import { AppDispatch } from "../../../store/store";
import { useAppSpiner } from "../../../src/hooks/AppSpiner";
import { useAppAlert } from "../../../src/hooks/AppAlert";

const removeEmptyStrings = (obj: object) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== "" && value !== null)
  );
};

const updateUserInfoTitleSpiner = "Сохранение данных. Подождите...";

const UserInfo = () => {
  const { navigate } = useNavigation<AppPropsScreen>();
  const dispatch: AppDispatch = useAppDispatch();
  const { appAlert } = useAppAlert();
  const { showSpiner, hideSpiner } = useAppSpiner();
  const { user } = useAppSelector((state) => state.userReducer);
  const [getInfo] = useLazyGetUserInfoQuery();
  const [updateUserInfo] = useUpdateUserInfoMutation();
  const { alertNotification } = useAppAlertNotification();

  const goBack = () => {
    navigate("Main", {
      screen: "Tabs",
      params: { screen: "TabProfile", params: { screen: "Profile" } },
    });
  };

  const getInfoHandle = () => {
    getInfo().then((response) => {
      const error = response.error as IUserErrorAuthResponse;
      if (error?.status && error?.status === 401) {
        goBack();
        alertNotification({
          message: "Вы не авторизованны",
          type: "error",
        });
      }
      DevelopmentDebug(response?.data);
    });
  };

  const changePasswordHandle = () => {
    navigate("Auth", {
      screen: "ChangePassword",
      params: { type: "UserInfo" },
    });
  };

  const confirmationDeleteUserAccountAlert = () => {
    appAlert("deleteAccount");
  };

  const updateUserInfoHandle = () => {
    showSpiner(updateUserInfoTitleSpiner);
    const body: IUpdateUserInfoRequest = {
      email: user.registration_type !== "email" ? user.email : "",
      phone: user.registration_type !== "phone" ? user.phone : "",
      surname: user.surname ? user.surname : "",
      name: user.name ? user.name : "",
      patronymic: user.patronymic ? user.patronymic : "",
      gender: user.gender,
      city: user.city ? user.city : "",
      birthday: user.birthday ? user.birthday : "",
    };

    const normalizeBody = removeEmptyStrings(body);

    updateUserInfo(normalizeBody)
      .unwrap()
      .then((response): void => {
        if (response.status === "success") {
          DevelopmentDebug(response.data.user);
          dispatch(setUser(response.data.user));
          hideSpiner();
          alertNotification({
            message: "Данные обнавлены",
            type: "success",
          });
        }
        DevelopmentDebug(response);
      })
      .catch((err: IUserErrorResponse) => {
        hideSpiner();
        DevelopmentDebug(err);
        alertNotification({
          message: err.data.message,
          type: "error",
        });
      })
      .finally(() => hideSpiner());
  };

  return (
    <Layout
      noMenu
      isBottomButton
      isNotification
      bottomButton={
        <BlockBottomButtons
          borderTop
          onPressApplayButtonHandle={updateUserInfoHandle}
          titleApplayButton="Сохранить"
        />
      }
      header={
        <Header title="Личные данные" leftIcon navigationHandle={goBack} />
      }
    >
      <View style={{ paddingHorizontal: 20, paddingBottom: 140 }}>
        <UserAvatar />

        <PersonalInformation />
        <ContactDetails />

        {user.registration_type !== "phone" && (
          <View style={{ marginTop: 40 }}>
            <ButtonOutline
              title="Сменить пароль"
              onPressHandle={changePasswordHandle}
              type={"dark"}
            />
          </View>
        )}

        <View
          style={{
            marginTop: 40,
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity
            onPress={confirmationDeleteUserAccountAlert}
            style={{
              borderColor: "#272728",
              borderBottomWidth: 1,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#272728",
              }}
            >
              Удалить аккаунт
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

export default UserInfo;
