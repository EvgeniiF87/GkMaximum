import { LinearGradient } from "expo-linear-gradient";
import { FC } from "react";
import { TouchableOpacity, Text, StyleProp, ViewStyle } from "react-native";

type ButtonGradientProps = {
  title: string;
  isDisabled?: boolean;
  flex?: number;
  onPressHandle?: () => void;
  _styles?: StyleProp<ViewStyle>;
};

const ButtonGradient: FC<ButtonGradientProps> = ({
  title,
  flex,
  onPressHandle,
  isDisabled,
  _styles,
}) => {
  const colors = !isDisabled ? ["#DE002B", "#D71E56"] : ["#5e5a5a", "#7d7b7b"];

  return (
    <TouchableOpacity
      style={[{ flex: flex ? flex : flex === 0 ? 0 : 1 }, _styles]}
      onPress={onPressHandle}
      disabled={isDisabled}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ borderRadius: 30, paddingVertical: 17 }}
      >
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontSize: 16,
            fontWeight: "700",
          }}
        >
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ButtonGradient;
