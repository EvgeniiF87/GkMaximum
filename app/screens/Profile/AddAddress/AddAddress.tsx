import { View, Text, TouchableOpacity } from "react-native";
import Layout from "../../../src/components/layout/Layout";
import Header from "../../../src/components/header/Header";
import { RouteProp, useNavigation } from "@react-navigation/native";
import {
  AppPropsScreen,
  AppStackParamList,
} from "../../../navigation/routes/app-navigation";
import BlockBottomButtons from "../../../src/components/BlockBottomButtons/BlockBottomButtons";
import InputTextLabel from "../../../src/components/input/InputTextLabel";
import { FC, useEffect, useState } from "react";
import { useAppAlert } from "../../../src/hooks/AppAlert";
import {
  useAddMyAddressMutation,
  useUpdateMyAddressMutation,
} from "../../../api/MyAddress/MyAddressApi";
import {
  IAddMyAddressErrorResponse,
  IAddMyAddressPayload,
} from "../../../entities/MyAddress/types/my-address-types";
import { useAppDispatch, useAppSelector } from "../../../src/hooks/redux";
import { DevelopmentDebug } from "../../../src/helpers/development-debug";
import { useAppSpiner } from "../../../src/hooks/AppSpiner";
import useAppAlertNotification from "../../../src/hooks/AppAlertNotification";
import {
  setCurrentDeleteMyAddressID,
  setUserAddresses,
  setUserUpdateAddresses,
} from "../../../store/reducers/UserSlice";
import BlockSwitch from "../../../src/components/block-switch/BlockSwitch";

type AddAddressProps = {
  route: RouteProp<AppStackParamList, "AddAddress">;
};

const AddAddress: FC<AddAddressProps> = ({ route }) => {
  const { goBack } = useNavigation<AppPropsScreen>();
  const { user } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const { showSpiner, hideSpiner } = useAppSpiner();
  const { alertNotification } = useAppAlertNotification();
  const [addMyAddress] = useAddMyAddressMutation();
  const [updateMyAddress] = useUpdateMyAddressMutation();
  const { type, address } = route.params;
  const { appAlert } = useAppAlert();

  const [text, setText] = useState("");
  const [isPrivateHouse, setIsPrivateHouse] = useState<boolean>(false);

  const [street, setStreet] = useState<string>("");
  const [validationStreet, setValidationStreet] = useState<boolean>(false);

  const [kvAndOfice, setKvAndOfice] = useState<string>("");
  const [validationKvAndOfice, setValidationKvAndOfice] =
    useState<boolean>(false);

  const [domofon, setDomofon] = useState<string>("");
  const [validationDomofon, setValidationDomofon] = useState<boolean>(false);

  const [entrance, setEntrance] = useState<string>("");
  const [validationEntrance, setValidationEntrance] = useState<boolean>(false);

  const [floor, setFloor] = useState<string>("");
  const [validationFloor, setValidationFloor] = useState<boolean>(false);

  const [disableButton, setDisableButton] = useState<boolean>(true);

  const confirmationDeleteAddressAlert = () => {
    const addressID = address?.id !== undefined ? address?.id : "";
    dispatch(setCurrentDeleteMyAddressID(String(addressID)));
    appAlert("deleteAdress");
  };

  useEffect(() => {
    if (
      street.length &&
      !validationStreet &&
      !validationKvAndOfice &&
      !validationDomofon &&
      !validationEntrance &&
      !validationFloor
    ) {
      setDisableButton(false);
    } else if (isPrivateHouse && street.length) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [
    street,
    kvAndOfice,
    entrance,
    floor,
    validationStreet,
    validationKvAndOfice,
    validationDomofon,
    validationEntrance,
    validationFloor,
    isPrivateHouse,
  ]);

  useEffect(() => {
    if (type === "add") {
      setText("Уточните новый адрес");
    }

    if (type === "edit") {
      setText("Редактирование адреса");
      setStreet(address?.house_street || "");
      setKvAndOfice(address?.flat || "");
      setDomofon(address?.doorphone || "");
      setEntrance(address?.entrance || "");
      setFloor(address?.floor || "");
      setIsPrivateHouse(address?.isPrivateHouse || false);
    }

    if (type === "order") {
      setText("Уточните адрес доставки");
    }
  }, []);

  const privateHouseHandle = (value: boolean) => {
    setIsPrivateHouse(value);
  };

  const streetValidation = (value: string) => {
    setStreet(value);
    if (value.match(/^[а-яёА-ЯЁ0-9 .,]+$/)) {
      setValidationStreet(false);
    } else if (value.length === 0) {
      setValidationStreet(false);
    } else {
      setValidationStreet(true);
    }
  };

  const kvAndOficeValidation = (value: string) => {
    setKvAndOfice(value);
    if (value.match(/^[а-яА-Я0-9]{1,4}$/)) {
      setValidationKvAndOfice(false);
    } else if (value.length === 0) {
      setValidationKvAndOfice(false);
    } else {
      setValidationKvAndOfice(true);
    }
  };

  const domofonValidation = (value: string) => {
    setDomofon(value);
    if (value.match(/^[0-9]{1,3}$/)) {
      setValidationDomofon(false);
    } else if (value.length === 0) {
      setValidationDomofon(false);
    } else {
      setValidationDomofon(true);
    }
  };

  const entranceValidation = (value: string) => {
    setEntrance(value);
    if (value.match(/^[0-9]{1,2}$/)) {
      setValidationEntrance(false);
    } else if (value.length === 0) {
      setValidationEntrance(false);
    } else {
      setValidationEntrance(true);
    }
  };

  const floorValidation = (value: string) => {
    setFloor(value);
    if (value.match(/^[0-9]{1,2}$/)) {
      setValidationFloor(false);
    } else if (value.length === 0) {
      setValidationFloor(false);
    } else {
      setValidationFloor(true);
    }
  };

  const addOrEditMyAddressHandle = () => {
    showSpiner("Сохранение данных. Подождите...");
    const payload: IAddMyAddressPayload = {
      city: user.city ? user.city : "Москва",
      house_street: street,
      flat: kvAndOfice.length ? kvAndOfice : undefined,
      entrance: entrance.length ? entrance : undefined,
      doorphone: domofon.length ? domofon : undefined,
      floor: floor.length ? floor : undefined,
      isPrivateHouse,
    };

    if (type === "edit" && address && address.id !== undefined) {
      updateMyAddress({ id: address?.id, body: payload })
        .unwrap()
        .then((response) => {
          if (response.status === "success") {
            DevelopmentDebug(response);
            dispatch(
              setUserUpdateAddresses({
                id: address?.id,
                payload: payload,
              })
            );
            hideSpiner();
            alertNotification({
              message: "Адрес успешно сохранён",
              type: "success",
            });
            goBack();
          }
        })
        .catch((err) => {
          DevelopmentDebug(err);
          hideSpiner();
          alertNotification({
            message: err?.data?.message,
            type: "error",
          });
        })
        .finally(() => hideSpiner());
    }

    if (type === "add") {
      addMyAddress(payload)
        .unwrap()
        .then((response): void => {
          DevelopmentDebug(response);
          if (response.status === "success") {
            dispatch(setUserAddresses(response.data));
            hideSpiner();
            alertNotification({
              message: "Адрес успешно сохранён",
              type: "success",
            });
            goBack();
          }
        })
        .catch((err: IAddMyAddressErrorResponse) => {
          DevelopmentDebug(err);
          hideSpiner();
          alertNotification({
            message: err?.data?.message,
            type: "error",
          });
        })
        .finally(() => hideSpiner());
    }
  };

  return (
    <Layout
      noMenu
      isNotification
      isBottomButton
      bottomButton={
        <BlockBottomButtons
          isDisabledApplayButton={disableButton}
          borderTop
          onPressApplayButtonHandle={addOrEditMyAddressHandle}
          titleApplayButton="Сохранить"
        />
      }
      header={<Header title={text} leftIcon navigationHandle={goBack} />}
    >
      <View style={{ paddingHorizontal: 20, paddingBottom: 140 }}>
        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: "#272728",
              lineHeight: 23.4,
            }}
          >
            Населённый пункт
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#272728",
              lineHeight: 20.8,
              marginTop: 20,
            }}
          >
            {type === "edit"
              ? `г. ${address?.city}`
              : type === "add"
              ? `г. ${user.city}`
              : "г. Ижевск"}
          </Text>
        </View>

        <BlockSwitch
          title="Частный дом"
          titleFontSize={16}
          isLocal
          localValue={isPrivateHouse || false}
          localOnChangeHandler={privateHouseHandle}
        />

        <View style={{ marginTop: 30 }}>
          <View>
            <InputTextLabel
              value={type === "edit" ? address?.house_street : street}
              label="Улица и дом"
              autoCapitalize={false}
              isValidation={validationStreet}
              onChange={streetValidation}
            />
          </View>

          {!isPrivateHouse && (
            <>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 40,
                }}
              >
                <InputTextLabel
                  value={type === "edit" ? address?.flat : kvAndOfice}
                  label="Кв. / офис"
                  autoCapitalize={false}
                  _styles={{ width: "45%" }}
                  isValidation={validationKvAndOfice}
                  onChange={kvAndOficeValidation}
                />
                <InputTextLabel
                  value={type === "edit" ? address?.doorphone : domofon}
                  label="Домофон"
                  autoCapitalize={false}
                  keyboardType={"numeric"}
                  _styles={{ width: "45%" }}
                  isValidation={validationDomofon}
                  onChange={domofonValidation}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 40,
                }}
              >
                <InputTextLabel
                  value={type === "edit" ? address?.entrance : entrance}
                  label="Подъезд"
                  autoCapitalize={false}
                  keyboardType={"numeric"}
                  _styles={{ width: "45%" }}
                  isValidation={validationEntrance}
                  onChange={entranceValidation}
                />
                <InputTextLabel
                  value={type === "edit" ? address?.floor : floor}
                  label="Этаж"
                  autoCapitalize={false}
                  keyboardType={"numeric"}
                  _styles={{ width: "45%" }}
                  isValidation={validationFloor}
                  onChange={floorValidation}
                />
              </View>
            </>
          )}
        </View>

        {type === "edit" && (
          <View
            style={{
              marginTop: 80,
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <TouchableOpacity
              onPress={confirmationDeleteAddressAlert}
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
                Удалить адрес
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Layout>
  );
};

export default AddAddress;
