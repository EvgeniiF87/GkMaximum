import { FC, useState } from "react";
import {
  View,
  TextInput,
  Text,
  Animated,
  Easing,
  StyleProp,
  ViewStyle,
  TextStyle,
  KeyboardType,
} from "react-native";
import { Icon } from "../Icon/Icon";
import { AppIcons } from "../../Icons";
import { MaskedTextInput } from "react-native-mask-text";

type InputTextLabelProps = {
  value: string | undefined;
  label: string;
  autoCapitalize?: boolean;
  editable?: boolean;
  textValidationError?: string;
  onChange?: (text: string) => void;
  focusHandle?: () => void;
  blurHandle?: () => void;
  isValidation?: boolean;
  isServerError?: boolean;
  isPhone?: boolean;
  isCity?: boolean;
  caretHidden?: boolean;
  showSoftInputOnFocus?: boolean;
  keyboardType?: KeyboardType;
  onChangePhone?: (text: string, rawText: string) => void;
  _styles?: StyleProp<ViewStyle>;
};

const InputTextLabel: FC<InputTextLabelProps> = ({
  value,
  label,
  autoCapitalize,
  editable,
  textValidationError,
  onChange,
  focusHandle,
  blurHandle,
  isValidation,
  isPhone,
  isCity,
  caretHidden,
  showSoftInputOnFocus,
  keyboardType,
  onChangePhone = (text: string, rawText: string) => {},
  isServerError,
  _styles,
}) => {
  const [animation] = useState(new Animated.Value(value ? 1 : -0.5));

  const handleFocus = () => {
    if (focusHandle) focusHandle();
    Animated.timing(animation, {
      toValue: 1,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    if (blurHandle) blurHandle();
    if (!value) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    }
  };

  const labelStyle = {
    top: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [18, -0.5],
    }),
    fontSize: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 16],
    }),
    color: "#898E9F",
  };

  const styles: StyleProp<TextStyle> = {
    fontSize: 16,
    fontWeight: "400",
    paddingTop: 30,
    paddingBottom: 10,
    borderColor: isValidation
      ? "#B02323"
      : value?.length
      ? "#272728"
      : "#898E9F",
    color: "#272728",
    borderBottomWidth: 1,
  };

  return (
    <View style={_styles}>
      <Animated.Text style={[{ position: "absolute", left: 0 }, labelStyle]}>
        {label}
      </Animated.Text>
      {isCity && (
        <Icon
          viewBox="8 14"
          size={15}
          path={AppIcons.app.arrowRight()}
          styles={{
            transform: [{ rotate: "90deg" }],
            position: "absolute",
            right: 0,
            top: 32.2,
          }}
        />
      )}
      {!isPhone ? (
        <TextInput
          editable={editable}
          caretHidden={caretHidden}
          autoCapitalize={autoCapitalize ? "sentences" : "none"}
          showSoftInputOnFocus={showSoftInputOnFocus}
          style={styles}
          keyboardType={keyboardType ? keyboardType : "default"}
          defaultValue={value}
          onChangeText={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      ) : (
        <MaskedTextInput
          editable={editable}
          mask="+7 (999) 999-99-99"
          keyboardType="numeric"
          value={value}
          onChangeText={onChangePhone}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={styles}
        />
      )}
      {isValidation && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 6,
          }}
        >
          <Text style={{ color: "#B02323", fontSize: 12 }}>
            {textValidationError
              ? textValidationError
              : "Введены некорректные значения"}
          </Text>
          <Icon viewBox="24 24" size={16} path={AppIcons.app.clarityError()} />
        </View>
      )}
    </View>
  );
};

export default InputTextLabel;
