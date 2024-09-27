import { FC } from "react";
import { TouchableOpacity, Text } from "react-native";

type ButtonType = "primary" | "secondary" | "dark";

type ButtonProps = {
  title: string;
  fontSize?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  type: ButtonType;
  isDisabled?: boolean;
  onPressHandle: () => void;
};

const Button: FC<ButtonProps> = ({
  title,
  fontSize,
  paddingVertical,
  paddingHorizontal,
  type = "primary",
  onPressHandle,
  isDisabled = false,
}) => {
  const Color =
    type === "primary"
      ? "#DE002B"
      : type === "secondary"
      ? "#D1D3DE"
      : "#272728";
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        borderRadius: 30,
        backgroundColor: Color,
        paddingVertical: paddingVertical ? paddingVertical : 17,
        paddingHorizontal: paddingHorizontal ? paddingHorizontal : 0,
      }}
      onPress={onPressHandle}
      disabled={isDisabled}
    >
      <Text
        style={{
          color: "#fff",
          textAlign: "center",
          fontSize: fontSize ? fontSize : 18,
          fontWeight: "600",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
