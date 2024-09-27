import { FC, useState } from "react";
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Dimensions,
  StyleProp,
  ViewStyle,
} from "react-native";
import InputText from "./InputText";
import { Icon } from "../Icon/Icon";
import { AppIcons } from "../../Icons";

type InputPasswordProps = {
  value: string;
  onChange: (text: string) => void;
  isValidation?: boolean;
  isConfirm?: boolean;
  placeholder: string;
  _styles?: StyleProp<ViewStyle>;
};

const InputPassword: FC<InputPasswordProps> = ({
  value,
  onChange,
  isValidation,
  isConfirm,
  placeholder,
  _styles,
}) => {
  const [hideAndShowPass, setHideAndShowPass] = useState(true);
  const [borderColor, setBorderColor] = useState(false);

  const onFocusHandle = () => {
    if (isValidation) setBorderColor(false);
    else setBorderColor(true);
  };

  const styles = {
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderColor: borderColor ? "#DE002B" : isValidation ? "#B02323" : "#898E9F",
    color: "#272728",
    borderWidth: isValidation ? 2 : 1,
    borderRadius: 13,
    marginTop: 6,
  };

  const positionTopIos = () => {
    if (isConfirm) {
      if (isValidation) {
        return Dimensions.get("window").fontScale === 1
          ? Dimensions.get("window").fontScale * 35.4
          : Dimensions.get("window").fontScale * 36.4;
      } else {
        return Dimensions.get("window").fontScale === 1
          ? Dimensions.get("window").fontScale * 35
          : Dimensions.get("window").fontScale * 35.6;
      }
    } else {
      if (isValidation) {
        return Dimensions.get("window").fontScale === 1
          ? Dimensions.get("window").fontScale * 30.4
          : Dimensions.get("window").fontScale * 32.4;
      } else {
        return Dimensions.get("window").fontScale === 1
          ? Dimensions.get("window").fontScale * 19
          : Dimensions.get("window").fontScale * 19;
      }
    }
  };

  return (
    <View style={_styles}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: isConfirm ? "space-between" : "flex-end",
          alignItems: "flex-end",
        }}
      >
        {isConfirm && <Text style={{ fontSize: 14 }}>Повторите пароль</Text>}
        {isValidation && (
          <Text style={{ color: "#B02323", fontSize: 10 }}>
            * Некорректные данные
          </Text>
        )}
      </View>
      <TouchableOpacity
        onPress={() => setHideAndShowPass(!hideAndShowPass)}
        style={[
          {
            position: "absolute",
            right: 20,
            zIndex: 1,
          },
          Platform.select({
            android: {
              top: isConfirm
                ? Dimensions.get("window").fontScale === 1
                  ? Dimensions.get("window").fontScale * 35
                  : Dimensions.get("window").fontScale * 43.5
                : Dimensions.get("window").fontScale === 1
                ? Dimensions.get("window").fontScale * 19
                : Dimensions.get("window").fontScale * 23.5,
            },
            ios: {
              top: positionTopIos(),
            },
          }),
        ]}
      >
        {hideAndShowPass ? (
          <Icon viewBox="24 24" size={30} path={AppIcons.app.hideEye()} />
        ) : (
          <Icon viewBox="24 24" size={30} path={AppIcons.app.eye()} />
        )}
      </TouchableOpacity>
      <TextInput
        secureTextEntry={hideAndShowPass}
        value={value}
        onChangeText={(text) => onChange(text)}
        onFocus={onFocusHandle}
        onBlur={() => setBorderColor(false)}
        style={styles}
        placeholder={placeholder}
      />
    </View>
  );
};

export default InputPassword;
