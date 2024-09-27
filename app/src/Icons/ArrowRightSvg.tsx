import { Path } from "react-native-svg";

export const ArrowRightSvg = (color?: string) => {
  return (
    <>
      <Path
        d="M1 1L7 7L1 13"
        stroke={color ? color : "#3E3E40"}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </>
  );
};
