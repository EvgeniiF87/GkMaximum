import { Path } from "react-native-svg";

//viewBox="0 0 14 2"
export const MinusSvg = (color?: string) => {
  return (
    <>
      <Path d="M12.75 1H1H12.75Z" fill={color ? color : "#272728"} />
      <Path
        d="M12.75 1H1"
        stroke={color ? color : "#272728"}
        strokeWidth="0.8"
        strokeLinecap="round"
      />
    </>
  );
};
