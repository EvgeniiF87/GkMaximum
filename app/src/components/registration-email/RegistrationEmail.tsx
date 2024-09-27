import { useEffect, useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRegistrationEmailMutation } from "../../../api/Auth/AuthApi";
import { IResponseError } from "../../../entities/Auth/types/auth-types";
import InputText from "../input/InputText";
import InputPassword from "../input/InputPassword";
import { validateEmail } from "../../helpers/validation/valodation-email";
import { validateNameAndSurname } from "../../helpers/validation/validation-name-surname";
import AuthButton from "../auth-button/AuthButton";
import useAppAlertNotification from "../../hooks/AppAlertNotification";
import { DevelopmentDebug } from "../../helpers/development-debug";
import { useAppSpiner } from "../../hooks/AppSpiner";

const titleSpiner = "Идёт отправка данных. Подождите...";

const RegistrationEmail = () => {
  const { navigate } = useNavigation();
  const [email, setEmail] = useState("");
  const [emailValidatin, setEmailValidatin] = useState(false);
  const [name, setName] = useState("");
  const [nameValidation, setNameValidation] = useState(false);
  const [surname, setSurname] = useState("");
  const [surnameValidation, setSurnameValidation] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const [registration] = useRegistrationEmailMutation();
  const { alertNotification } = useAppAlertNotification();
  const { showSpiner, hideSpiner } = useAppSpiner();

  const getCodeHandle = (): void => {
    showSpiner(titleSpiner);
    registration({
      email,
      name,
      surname,
      password,
      repeat_password: confirmPassword,
    })
      .unwrap()
      .then((data) => {
        if (data.status === "success") {
          hideSpiner();
          navigate("Auth", {
            screen: "CheckCode",
            params: { email, type: "registration" },
          });
        }
      })
      .catch((err: IResponseError) => {
        setIsDisabled(true);
        alertNotification({ message: err?.data?.message, type: "error" });
        DevelopmentDebug(err.data);
      })
      .finally(() => hideSpiner());
  };

  const onChangeEmail = (value: string) => {
    setEmail(value);
    if (validateEmail(value) || value.length === 0) setEmailValidatin(false);
    if (!validateEmail(value) && value.length > 0) setEmailValidatin(true);
  };

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

  useEffect(() => {
    if (
      validateEmail(email) &&
      name.length > 0 &&
      surname.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0 &&
      password === confirmPassword
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, name, surname, password, confirmPassword]);

  return (
    <View style={{ marginTop: 20 }}>
      <View style={{ rowGap: 12 }}>
        <InputText
          value={email}
          autoCapitalize
          onChange={onChangeEmail}
          isValidation={emailValidatin}
          textValidationError="* Некорректные данные"
          placeholder="Почта"
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
        <InputPassword
          value={password}
          onChange={setPassword}
          placeholder="Пароль"
        />
      </View>

      <InputPassword
        value={confirmPassword}
        onChange={setConfirmPassword}
        placeholder="Пароль"
        isConfirm
        _styles={{ marginTop: 20 }}
      />

      <View style={{ marginTop: 15 }}>
        <AuthButton
          title="Зарегестрироваться"
          onPressHandle={getCodeHandle}
          isDisabled={isDisabled}
        />
      </View>
    </View>
  );
};

export default RegistrationEmail;
