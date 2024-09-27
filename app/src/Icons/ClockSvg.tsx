import { Path } from "react-native-svg";

//viewBox="0 0 18 18"
export const ClockSvg = (color?: string) => {
  return (
    <>
      <Path
        d="M9 17.5C13.6944 17.5 17.5 13.6944 17.5 9C17.5 4.30558 13.6944 0.5 9 0.5C4.30558 0.5 0.5 4.30558 0.5 9C0.5 13.6944 4.30558 17.5 9 17.5Z"
        stroke={color ? color : "#272728"}
      />
      <Path
        d="M13.5 9H9.25C9.1837 9 9.12011 8.97366 9.07322 8.92678C9.02634 8.87989 9 8.8163 9 8.75V5.5"
        stroke={color ? color : "#272728"}
        stroke-linecap="round"
      />
    </>
  );
};
