import React, { useState } from "react";
import { View, Text } from "react-native";
import {
  setUserPatronymic,
  setUserName,
  setUserGender,
  setUserSurname,
} from "../../../store/reducers/UserSlice";
import BlockRadioButtons from "../block-radio-buttons/BlockRadioButtons";
import InputTextLabel from "../input/InputTextLabel";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { validateNameAndSurname } from "../../helpers/validation/validation-name-surname";
import BlockBirthday from "./BlockBirthday";

const list = [
  { label: "Мужчина", value: false },
  { label: "Женщина", value: true },
];

const PersonalInformation = () => {
  const {
    user: { patronymic, name, gender, surname },
  } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();

  const [validationSurname, setValidationSurname] = useState(false);
  const [validationName, setValidationName] = useState(false);
  const [validationPatronymic, setValidationPatronymic] = useState(false);

  const surnameValidation = (value: string) => {
    dispatch(setUserSurname(value));
    if (validateNameAndSurname(value)) {
      setValidationSurname(false);
    } else {
      setValidationSurname(true);
    }
  };

  const nameValidation = (value: string) => {
    dispatch(setUserName(value));
    if (validateNameAndSurname(value)) {
      setValidationName(false);
    } else {
      setValidationName(true);
    }
  };

  const patronymicValidation = (value: string) => {
    dispatch(setUserPatronymic(value));
    if (validateNameAndSurname(value)) {
      setValidationPatronymic(false);
    } else {
      setValidationPatronymic(true);
    }
  };

  return (
    <View style={{ marginTop: 40 }}>
      <View>
        <Text
          style={{
            color: "#272728",
            fontSize: 16,
            fontWeight: "600",
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
        _styles={{ marginTop: 10 }}
        onChange={surnameValidation}
      />

      <InputTextLabel
        value={name}
        label="Имя"
        autoCapitalize
        isValidation={validationName}
        textValidationError="Только кириллица"
        _styles={{ marginTop: 20 }}
        onChange={nameValidation}
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

      <BlockBirthday />

      <BlockRadioButtons
        list={list}
        selected={gender}
        variant={"horizontal"}
        columnGap={40}
        _styles={{ marginTop: 20 }}
        onSelect={(value) => dispatch(setUserGender(value))}
      />
    </View>
  );
};

export default PersonalInformation;
