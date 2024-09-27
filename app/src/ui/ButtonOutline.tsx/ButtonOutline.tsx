import { FC } from "react";
import {
  TouchableOpacity,
  Text,
  Platform,
  StyleProp,
  ViewStyle,
} from "react-native";

type ButtonType = "primary" | "secondary" | "dark" | "white";

type ButtonOutlineProps = {
  title: string;
  width?: string | number;
  fontSize?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  uppercase?: boolean;
  borderRadius?: number;
  type?: ButtonType;
  isDisabled?: boolean;
  _styles?: StyleProp<ViewStyle>;
  onPressHandle: () => void;
};

const ButtonOutline: FC<ButtonOutlineProps> = ({
  title,
  width,
  fontSize,
  paddingVertical,
  paddingHorizontal,
  uppercase,
  borderRadius,
  type = "primary",
  onPressHandle,
  isDisabled = false,
  _styles,
}) => {
  const Color =
    type === "primary"
      ? "#DE002B"
      : type === "secondary"
      ? "#D1D3DE"
      : type === "white"
      ? "#fff"
      : "#272728";
  return (
    <TouchableOpacity
      style={[
        {
          borderRadius: borderRadius ? borderRadius : 30,
          borderColor: Color,
          borderWidth: 1,
          backgroundColor: type === "white" ? "transparent" : "#fff",
          paddingVertical: paddingVertical ? paddingVertical : 17,
          paddingHorizontal: paddingHorizontal ? paddingHorizontal : 0,
          justifyContent: "center",
          alignItems: "center",
        },
        Platform.select({ ios: { flex: 1 } }),
        _styles,
      ]}
      onPress={onPressHandle}
      disabled={isDisabled}
    >
      <Text
        style={{
          color: Color,
          fontSize: fontSize ? fontSize : 16,
          fontWeight: "400",
          textTransform: uppercase ? "uppercase" : "none",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonOutline;
