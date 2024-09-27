import { Path } from "react-native-svg";

//viewBox="0 0 18 22"
export const NotificationSvg = (color?: string) => {
  return (
    <>
      <Path
        d="M3 18V9C3 7.4087 3.63214 5.88258 4.75736 4.75736C5.88258 3.63214 7.4087 3 9 3C10.5913 3 12.1174 3.63214 13.2426 4.75736C14.3679 5.88258 15 7.4087 15 9V18M3 18H15M3 18H1M15 18H17M8 21H10"
        stroke={color ? color : "#898E9F"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 3C9.55228 3 10 2.55228 10 2C10 1.44772 9.55228 1 9 1C8.44772 1 8 1.44772 8 2C8 2.55228 8.44772 3 9 3Z"
        stroke={color ? color : "#898E9F"}
        strokeWidth="1.5"
      />
    </>
  );
};
