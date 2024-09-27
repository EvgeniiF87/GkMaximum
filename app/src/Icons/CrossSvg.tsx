import { Path } from "react-native-svg";

export const CrossSvg = (color?: string) => {
  return (
    <>
      <Path
        d="M18 6L6 18"
        stroke={color ? color : "#3E3E40"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 6L18 18"
        stroke={color ? color : "#3E3E40"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
};
