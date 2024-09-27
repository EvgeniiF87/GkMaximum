import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { useRegistrationPhoneMutation } from "../../../api/Auth/AuthApi";
import { IResponseError } from "../../../entities/Auth/types/auth-types";
import InputText from "../input/InputText";
import InputPhone from "../input/InputPhone";
import { validateNameAndSurname } from "../../helpers/validation/validation-name-surname";
import AuthButton from "../auth-button/AuthButton";
import useAppAlertNotification from "../../hooks/AppAlertNotification";
import { DevelopmentDebug } from "../../helpers/development-debug";
import { useAppSpiner } from "../../hooks/AppSpiner";

const titleSpiner = "Идёт отправка данных. Подождите...";

const RegistrationPhone = () => {
  const { navigate } = useNavigation();
  const [phone, setPhone] = useState("");
  const [phoneFormat, setPhoneFormat] = useState("");
  const [name, setName] = useState("");
  const [nameValidation, setNameValidation] = useState(false);
  const [surname, setSurname] = useState("");
  const [surnameValidation, setSurnameValidation] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const [registration] = useRegistrationPhoneMutation();
  const { alertNotification } = useAppAlertNotification();
  const { showSpiner, hideSpiner } = useAppSpiner();

  const getCodeHandle = (): void => {
    showSpiner(titleSpiner);
    registration({ name, surname, phone })
      .unwrap()
      .then((data) => {
        if (data.status === "success") {
          hideSpiner();
          navigate("Auth", {
            screen: "CheckCode",
            params: { phone, phoneFormat, type: "registration" },
          });
        }
      })
      .catch((err: IResponseError) => {
        hideSpiner();
        alertNotification({ message: err?.data?.message, type: "error" });
        DevelopmentDebug(err.data);
      })
      .finally(() => hideSpiner());
  };

  useEffect(() => {
    if (phone.length > 0 && name.length > 0 && surname.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [phone, name, surname]);

  const onChangeName = (value: string) => {
    setName(value);
    if (validateNameAndSurname(value) || value.length === 0)
      setNameValidation(false);
    if (!validateNameAndSurname(value) && value.length > 0)
      setNameValidation(true);
  };

  const onChangeSurname = (value: string) => {
    setSurname(value);
    if (validateNameAndSurname(value) || value.length === 0)
      setSurnameValidation(false);
    if (!validateNameAndSurname(value) && value.length > 0)
      setSurnameValidation(true);
  };

  return (
    <View style={{ marginTop: 20 }}>
      <View style={{ rowGap: 12 }}>
        <InputPhone
          value={phoneFormat}
          setPhone={setPhone}
          setPhoneFormat={setPhoneFormat}
        />
        <InputText
          value={name}
          onChange={onChangeName}
          isValidation={nameValidation}
          placeholder="Имя"
        />
        <InputText
          value={surname}
          onChange={onChangeSurname}
          isValidation={surnameValidation}
          placeholder="Фамилия"
        />
      </View>

      <View style={{ marginTop: 15 }}>
        <AuthButton
          title="Получить код"
          onPressHandle={getCodeHandle}
          isDisabled={isDisabled}
        />
      </View>
    </View>
  );
};

export default RegistrationPhone;
