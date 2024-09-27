import { Path } from "react-native-svg";

export const ProfileSvg = (color?: string) => {
  return (
    <>
      <Path
        d="M10.5 0.723633C4.97715 0.723633 0.5 5.20078 0.5 10.7236C0.5 16.2464 4.97715 20.7236 10.5 20.7236C16.0228 20.7236 20.5 16.2464 20.5 10.7236C20.5 5.20078 16.0228 0.723633 10.5 0.723633Z"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M2.77148 17.0693C2.77148 17.0693 5.0005 14.2236 10.5005 14.2236C16.0005 14.2236 18.2296 17.0693 18.2296 17.0693"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M10.4999 10.7236C12.1568 10.7236 13.4999 9.38053 13.4999 7.72363C13.4999 6.06678 12.1568 4.72363 10.4999 4.72363C8.84301 4.72363 7.49991 6.06678 7.49991 7.72363C7.49991 9.38053 8.84301 10.7236 10.4999 10.7236Z"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </>
  );
};
