import { Path } from "react-native-svg";

export const ArrowLeftSvg = (color?: string) => {
  return (
    <>
      <Path
        d="M7 13L1 7L7 1"
        stroke={color ? color : "#3E3E40"}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </>
  );
};
