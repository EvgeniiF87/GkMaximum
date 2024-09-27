import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { AppPropsScreen } from "../../../../navigation/routes/app-navigation";
import { setResetUser } from "../../../../store/reducers/UserSlice";
import { useAppDispatch } from "../../../hooks/redux";
import BlockArrowRight from "../../block-arrow-right/BlockArrowRight";
import { useLogoutMutation } from "../../../../api/Auth/AuthApi";
import useAppAlertNotification from "../../../hooks/AppAlertNotification";
import { useAppSpiner } from "../../../hooks/AppSpiner";
import { resetHistoryOrders } from "../../../../store/reducers/HistoryOrdersSlice";
import { setDeleteBasketProducts } from "../../../../store/reducers/BasketSlice";

const titleSpiner = "Идёт выход с аккаунта. Подождите...";

const BlockLogout = () => {
  const { navigate } = useNavigation<AppPropsScreen>();
  const { alertNotification } = useAppAlertNotification();
  const { showSpiner, hideSpiner } = useAppSpiner();
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const logoutHandle = () => {
    showSpiner(titleSpiner);
    logout({})
      .unwrap()
      .then((response) => {
        if (response.status === "success") {
          dispatch(setResetUser());
          dispatch(resetHistoryOrders());
          dispatch(setDeleteBasketProducts());
          hideSpiner();
          alertNotification({
            message: "Вы вышли со своего аккаунта",
            type: "success",
          });
        }
      })
      .catch((err) => {
        hideSpiner();
      });
    // navigate("Main", {
    //   screen: "Tabs",
    //   params: { screen: "TabHome", params: { screen: "Home" } },
    // });
  };

  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingTop: 20,
        marginTop: 30,
        borderTopColor: "#898E9F",
        borderTopWidth: 0.2,
      }}
    >
      <BlockArrowRight
        title="Выйти из профиля"
        logout
        titleFontSize={16}
        paddingHorizontal={0}
        navigationHandle={logoutHandle}
      />
    </View>
  );
};

export default BlockLogout;
