import { onFocus } from "@reduxjs/toolkit/dist/query/core/setupListeners";
import { FC, useState } from "react";
import { TextInput, View, Text, StyleProp, ViewStyle } from "react-native";

type InputTextProps = {
  value: string | undefined;
  onChange: (text: string) => void;
  focusHandle?: () => void;
  blurHandle?: () => void;
  isValidation?: boolean;
  textValidationError?: string;
  isTitle?: boolean;
  isServerError?: boolean;
  autoCapitalize?: boolean;
  placeholder: string;
  _styles?: StyleProp<ViewStyle>;
};

const InputText: FC<InputTextProps> = ({
  value,
  onChange,
  focusHandle,
  blurHandle,
  isValidation,
  textValidationError,
  isTitle,
  isServerError,
  autoCapitalize,
  placeholder,
  _styles,
}) => {
  const [borderColor, setBorderColor] = useState(false);

  const onFocusHandle = () => {
    if (focusHandle) focusHandle();
    if (isValidation) setBorderColor(false);
    else setBorderColor(true);
  };

  const onBlurHandle = () => {
    if (blurHandle) blurHandle();
    setBorderColor(false);
  };

  const styles = {
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderColor: borderColor
      ? "#DE002B"
      : isValidation || isServerError
      ? "#B02323"
      : "#898E9F",
    color: "#272728",
    borderWidth: isValidation || isServerError ? 2 : 1,
    borderRadius: 13,
    marginTop: 6,
  };

  return (
    <View style={_styles}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: isTitle ? "space-between" : "flex-end",
          alignItems: "flex-end",
        }}
      >
        {isTitle && <Text style={{ fontSize: 14 }}>Почта</Text>}
        {isValidation && (
          <Text style={{ color: "#B02323", fontSize: 10 }}>
            {textValidationError ? textValidationError : "* Только кириллица"}
          </Text>
        )}
        {isServerError && (
          <Text style={{ color: "#B02323", fontSize: 10 }}>
            * Аккаунта с данной почтой не существует
          </Text>
        )}
      </View>
      <TextInput
        value={value}
        autoCapitalize={autoCapitalize ? "none" : "sentences"}
        onChangeText={onChange}
        onFocus={onFocusHandle}
        onBlur={onBlurHandle}
        style={styles}
        placeholder={placeholder}
      />
    </View>
  );
};

export default InputText;
