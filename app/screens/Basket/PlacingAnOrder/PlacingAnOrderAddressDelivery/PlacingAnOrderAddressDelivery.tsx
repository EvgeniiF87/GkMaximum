import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppPropsScreen } from "../../../../navigation/routes/app-navigation";
import { useAppDispatch, useAppSelector } from "../../../../src/hooks/redux";
import useAppAlertNotification from "../../../../src/hooks/AppAlertNotification";
import { useAppSpiner } from "../../../../src/hooks/AppSpiner";
import { useSelectMainMyAddressMutation } from "../../../../api/MyAddress/MyAddressApi";
import {
  IAddMyAddressErrorResponse,
  IMyAddress,
} from "../../../../entities/MyAddress/types/my-address-types";
import { DevelopmentDebug } from "../../../../src/helpers/development-debug";
import { setUserMainAddresses } from "../../../../store/reducers/UserSlice";
import Layout from "../../../../src/components/layout/Layout";
import Header from "../../../../src/components/header/Header";
import BlockAddressRadioButtons from "../../../../src/components/block-address-radio-buttons/BlockAddressRadioButtons";
import BlockArrowRight from "../../../../src/components/block-arrow-right/BlockArrowRight";

const PlacingAnOrderAddressDelivery = () => {
  const { goBack, navigate } = useNavigation<AppPropsScreen>();
  const { user } = useAppSelector((state) => state.userReducer);
  const { alertNotification } = useAppAlertNotification();
  const { showSpiner, hideSpiner } = useAppSpiner();
  const [selectMainUserAddress] = useSelectMainMyAddressMutation();
  const dispatch = useAppDispatch();

  const addAddress = () => {
    navigate("PlacingAnOrder", {
      screen: "PlacingAnOrderAddAddressDelivery",
      params: { type: "add" },
    });
  };

  const selectMainAddressHandle = (address: IMyAddress) => {
    showSpiner("Сохраняем изменения. Подождите...");
    selectMainUserAddress({ body: address, id: address.id })
      .unwrap()
      .then((response) => {
        DevelopmentDebug(response);
        if (response.status === "success") {
          dispatch(setUserMainAddresses({ id: address.id }));
          hideSpiner();
          alertNotification({
            message: "Адрес выбран как основной",
            type: "success",
          });
        }
      })
      .catch((err: IAddMyAddressErrorResponse) => {
        DevelopmentDebug(err);
        hideSpiner();
        alertNotification({
          message: err?.data?.message,
          type: "error",
        });
      });
  };

  return (
    <Layout
      header={
        <Header
          title="Выберите адрес доставки"
          leftIcon
          navigationHandle={goBack}
        />
      }
    >
      {user?.my_address?.length !== 0 && (
        <BlockAddressRadioButtons
          list={user.my_address || []}
          rowGap={25}
          onSelect={(value) => selectMainAddressHandle(value)}
          _styles={{ paddingHorizontal: 20, marginTop: 20 }}
        />
      )}

      <View style={{ marginTop: 10 }}>
        <BlockArrowRight
          title="Добавить новый адрес"
          titleFontSize={16}
          plus
          navigationHandle={addAddress}
        />
      </View>
    </Layout>
  );
};

export default PlacingAnOrderAddressDelivery;
