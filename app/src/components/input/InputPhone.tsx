import { FC, useState } from "react";
import { MaskedTextInput } from "react-native-mask-text";

type InputPhoneProps = {
  value: string;
  setPhone: (rawText: string) => void;
  setPhoneFormat: (text: string) => void;
  borderColorError?: boolean;
  borderWidthError?: boolean;
  placeholder?: string;
};

const InputPhone: FC<InputPhoneProps> = ({
  value,
  setPhone,
  setPhoneFormat,
  borderColorError,
  borderWidthError,
  placeholder,
}) => {
  const [borderColor, setBorderColor] = useState(false);

  return (
    <MaskedTextInput
      mask="+7 (999) 999-99-99"
      placeholder={placeholder ? placeholder : "+7 (123) 456-33-44"}
      keyboardType="numeric"
      value={value}
      onChangeText={(text, rawText) => {
        setPhoneFormat(text);
        setPhone(rawText);
      }}
      onFocus={() => setBorderColor(true)}
      onBlur={() => setBorderColor(false)}
      style={{
        fontSize: 18,
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderColor: borderColor
          ? "#DE002B"
          : borderColorError
          ? "#B02323"
          : "#898E9F",
        color: "#272728",
        borderWidth: borderWidthError ? 2 : 1,
        borderRadius: 13,
        marginTop: 6,
      }}
    />
  );
};

export default InputPhone;
