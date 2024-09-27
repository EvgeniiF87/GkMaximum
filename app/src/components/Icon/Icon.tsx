import { FC, ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Svg } from "react-native-svg";

type IconProps = {
  width?: number | string;
  height?: number;
  size?: number;
  color?: string;
  path: ReactNode;
  viewBox?: string;
  styles?: StyleProp<ViewStyle>;
};

export const Icon: FC<IconProps> = ({
  width,
  height,
  size,
  color,
  path,
  viewBox,
  styles,
}): ReactNode => {
  return (
    <Svg
      width={size ? size : width}
      height={size ? size : height}
      color={color}
      fill={"none"}
      viewBox={viewBox ? `0 0 ${viewBox}` : "0 0 28 28"}
      style={styles}
    >
      {path}
    </Svg>
  );
};
