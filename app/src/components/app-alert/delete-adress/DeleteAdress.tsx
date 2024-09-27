import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { resetAppAlert } from "../../../../store/reducers/AppSlice";
import { TouchableOpacity, View, Text, Dimensions } from "react-native";
import { Icon } from "../../Icon/Icon";
import { AppIcons } from "../../../Icons";
import ButtonGradient from "../../../ui/button-gradient/ButtonGradient";
import { AppPropsScreen } from "../../../../navigation/routes/app-navigation";
import ButtonOutline from "../../../ui/ButtonOutline.tsx/ButtonOutline";
import useAppAlertNotification from "../../../hooks/AppAlertNotification";
import { useAppSpiner } from "../../../hooks/AppSpiner";
import { deleteUserAddresses } from "../../../../store/reducers/UserSlice";
import { useDeleteMyAddressMutation } from "../../../../api/MyAddress/MyAddressApi";
import { DevelopmentDebug } from "../../../helpers/development-debug";

const { width } = Dimensions.get("window");

const DeleteAdress = () => {
  const { navigate } = useNavigation<AppPropsScreen>();
  const [deleteMyAdress] = useDeleteMyAddressMutation();
  const { currentDeleteMyAddressID } = useAppSelector(
    (state) => state.userReducer
  );
  const { alertNotification } = useAppAlertNotification();
  const { showSpiner, hideSpiner } = useAppSpiner();

  const dispatch = useAppDispatch();
  console.log({ currentDeleteMyAddressID });

  const closeModalHandle = () => {
    dispatch(resetAppAlert());
  };

  const deleteUserAddressHandle = () => {
    closeModalHandle();
    showSpiner("Удаляем адрес. Подождите...");
    deleteMyAdress({ id: Number(currentDeleteMyAddressID) })
      .unwrap()
      .then((response) => {
        DevelopmentDebug(response);
        if (response.status === "success") {
          dispatch(deleteUserAddresses(Number(currentDeleteMyAddressID)));
          dispatch(resetAppAlert());
          hideSpiner();
          alertNotification({
            message: "Адрес был успешно удалён",
            type: "success",
          });
          navigate("Main", {
            screen: "Tabs",
            params: { screen: "TabProfile", params: { screen: "MyAddresses" } },
          });
        }
      })
      .catch((err): void => {
        hideSpiner();
        DevelopmentDebug(err);
        alertNotification({
          message: "Ошибка удаления адреса",
          type: "error",
        });
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
            Вы уверены что хотите удалить адрес?
          </Text>
        </View>

        <View style={{ marginTop: 20, flexDirection: "row", columnGap: 10 }}>
          <ButtonGradient
            title="Отмена"
            flex={1}
            onPressHandle={closeModalHandle}
          />
          <ButtonOutline
            title="Удалить"
            onPressHandle={deleteUserAddressHandle}
          />
        </View>
      </View>
    </View>
  );
};

export default DeleteAdress;
