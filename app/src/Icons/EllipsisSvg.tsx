import { Circle } from "react-native-svg";

//viewBox="0 0 4 20"
export const EllipsisSvg = (color?: string) => {
  return (
    <>
      <Circle cx="2" cy="2" r="2" fill="#898E9F" />
      <Circle cx="2" cy="10" r="2" fill="#898E9F" />
      <Circle cx="2" cy="18" r="2" fill="#898E9F" />
    </>
  );
};
