import { Path } from "react-native-svg";

//viewBox="0 0 16 18"
export const LogoutSvg = (color?: string) => {
  return (
    <>
      <Path
        d="M11 1.00098H1V15.001C1 15.5314 1.21071 16.0401 1.58579 16.4152C1.96086 16.7903 2.46957 17.001 3 17.001H11M12 12.001L15 9.00098M15 9.00098L12 6.00098M15 9.00098H5"
        stroke={color ? color : "#3E3E40"}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </>
  );
};
