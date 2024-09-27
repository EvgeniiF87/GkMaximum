import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppPropsScreen } from "../../../../navigation/routes/app-navigation";
import Layout from "../../../../src/components/layout/Layout";
import Header from "../../../../src/components/header/Header";
import BlockBottomButtons from "../../../../src/components/BlockBottomButtons/BlockBottomButtons";
import { useAppDispatch, useAppSelector } from "../../../../src/hooks/redux";
import InputTextLabel from "../../../../src/components/input/InputTextLabel";

import { validateNameAndSurname } from "../../../../src/helpers/validation/validation-name-surname";
import {
  setPlacingAnOrderRecipientName,
  setPlacingAnOrderRecipientSurname,
  setPlacingAnOrderRecipientPatronymic,
  setPlacingAnOrderRecipientPhone,
} from "../../../../store/reducers/OrderSlice";

const PlacingAnOrderUserRecipient = () => {
  const { goBack } = useNavigation<AppPropsScreen>();
  const { recipient } = useAppSelector((state) => state.OrderReducer);
  const dispatch = useAppDispatch();

  const [name, setName] = useState<string>(recipient.name ?? "");
  const [surname, setSurname] = useState<string>(recipient.surname ?? "");
  const [patronymic, setPatronymic] = useState<string>(
    recipient.patronymic ?? ""
  );
  const [phone, setPhone] = useState<string>(recipient.phone ?? "");
  const [validationSurname, setValidationSurname] = useState<boolean>(false);
  const [validationName, setValidationName] = useState<boolean>(false);
  const [validationPatronymic, setValidationPatronymic] =
    useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  const surnameValidation = (value: string) => {
    setSurname(value);
    if (validateNameAndSurname(value)) {
      setValidationSurname(false);
    } else {
      setValidationSurname(true);
    }
  };

  const nameValidation = (value: string) => {
    setName(value);
    if (validateNameAndSurname(value)) {
      setValidationName(false);
    } else {
      setValidationName(true);
    }
  };

  const patronymicValidation = (value: string) => {
    setPatronymic(value);
    if (validateNameAndSurname(value)) {
      setValidationPatronymic(false);
    } else {
      setValidationPatronymic(true);
    }
  };

  const surnameBlurHandle = () => {
    setValidationSurname(false);
  };

  const nameBlurHandle = () => {
    setValidationName(false);
  };

  const onChangePhone = (text: string, rawText: string) => {
    setPhone(rawText);
  };

  const saveHandle = () => {
    dispatch(setPlacingAnOrderRecipientName(name));
    dispatch(setPlacingAnOrderRecipientSurname(surname));
    dispatch(setPlacingAnOrderRecipientPatronymic(patronymic));
    dispatch(setPlacingAnOrderRecipientPhone(phone));
    goBack();
  };

  useEffect(() => {
    if (
      !validationName &&
      name.length &&
      !validationSurname &&
      surname.length &&
      phone.length
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [validationName, validationSurname, phone, name, surname]);

  return (
    <Layout
      noMenu
      header={<Header title="Получатель" leftIcon navigationHandle={goBack} />}
      isBottomButton
      bottomButton={
        <BlockBottomButtons
          isDisabledApplayButton={disabled}
          titleApplayButton="Сохранить"
          borderTop
          onPressApplayButtonHandle={saveHandle}
        />
      }
    >
      <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
        <View>
          <Text
            style={{
              color: "#272728",
              fontSize: 16,
              fontWeight: "600",
              lineHeight: 20.8,
            }}
          >
            Личная информация:
          </Text>
        </View>

        <InputTextLabel
          value={surname}
          label="Фамилия"
          autoCapitalize
          isValidation={validationSurname}
          textValidationError="Только кириллица"
          _styles={{ marginTop: 20 }}
          onChange={surnameValidation}
          blurHandle={surnameBlurHandle}
        />

        <InputTextLabel
          value={name}
          label="Имя"
          autoCapitalize
          isValidation={validationName}
          textValidationError="Только кириллица"
          _styles={{ marginTop: 20 }}
          onChange={nameValidation}
          blurHandle={nameBlurHandle}
        />

        <InputTextLabel
          value={patronymic}
          label="Отчество"
          autoCapitalize
          isValidation={validationPatronymic}
          textValidationError="Только кириллица"
          _styles={{ marginTop: 20 }}
          onChange={patronymicValidation}
        />

        <Text
          style={{
            color: "#272728",
            fontSize: 16,
            fontWeight: "600",
            lineHeight: 20.8,
            marginTop: 60,
          }}
        >
          Контактные данные
        </Text>

        <InputTextLabel
          value={phone}
          label="Номер"
          isPhone
          onChangePhone={onChangePhone}
          _styles={{ marginTop: 10 }}
        />
      </View>
    </Layout>
  );
};

export default PlacingAnOrderUserRecipient;
