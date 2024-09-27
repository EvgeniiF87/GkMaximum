import { View, Text } from "react-native";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setUserPhone, setUserEmail } from "../../../store/reducers/UserSlice";
import { useState } from "react";
import { validateEmail } from "../../helpers/validation/valodation-email";
import InputTextLabel from "../input/InputTextLabel";
import { useNavigation } from "@react-navigation/native";
import { AppPropsScreen } from "../../../navigation/routes/app-navigation";

const ContactDetails = () => {
  const { replace } = useNavigation<AppPropsScreen>();
  const {
    user: { phone, email, city, registration_type },
  } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();

  const [validationEmail, setValidationEmail] = useState(false);

  const emailValidation = (value: string) => {
    dispatch(setUserEmail(value));
    if (validateEmail(value) || value.length === 0) {
      setValidationEmail(false);
    } else {
      setValidationEmail(true);
    }
  };

  const onFocusCity = () => {
    replace("Main", {
      screen: "Tabs",
      params: {
        screen: "TabHome",
        params: { screen: "SelectionCity", params: { type: "profile" } },
      },
    });
  };

  const onChangePhone = (text: string, rawText: string) => {
    dispatch(setUserPhone(rawText));
  };

  return (
    <View style={{ marginTop: 30 }}>
      <View>
        <Text
          style={{
            color: "#272728",
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          Контактные данные
        </Text>
      </View>

      <InputTextLabel
        value={phone}
        editable={registration_type === "phone" ? false : true}
        label="Номер"
        isPhone
        onChangePhone={onChangePhone}
        _styles={{ marginTop: 10 }}
      />

      <InputTextLabel
        value={email}
        editable={registration_type === "email" ? false : true}
        label="Почта"
        isValidation={validationEmail}
        _styles={{ marginTop: 20 }}
        onChange={emailValidation}
      />

      <InputTextLabel
        value={city}
        label="Город"
        isCity
        caretHidden={true}
        showSoftInputOnFocus={false}
        _styles={{ marginTop: 20 }}
        focusHandle={onFocusCity}
      />
    </View>
  );
};

export default ContactDetails;
