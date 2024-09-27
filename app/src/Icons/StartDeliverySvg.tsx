import { Path, Circle, Line } from "react-native-svg";

// viewBox="0 0 119 20"
export const StartDeliverySvg = (color?: string) => {
  return (
    <>
      <Circle cx="10" cy="10" r="10" fill="#272728" />
      <Circle cx="10" cy="10" r="8" fill="white" />
      <Circle cx="10" cy="10" r="5" fill="#272728" />
      <Path
        d="M232.908 7.95287C232.87 7.91163 232.823 7.87845 232.771 7.85521C232.72 7.83198 232.664 7.81916 232.607 7.81748C232.551 7.81579 232.494 7.82529 232.441 7.84541C232.388 7.86553 232.34 7.89589 232.299 7.93475C232.299 7.93475 232.299 7.93476 232.299 7.93476L228.105 11.8875L226.855 10.6184L226.855 10.6184L226.853 10.6167C226.772 10.5373 226.664 10.4929 226.55 10.493C226.437 10.4931 226.329 10.5377 226.248 10.6172C226.167 10.6966 226.121 10.8046 226.12 10.9178C226.118 11.031 226.161 11.1403 226.239 11.2221L226.239 11.2221L226.241 11.2238L227.748 12.7537C227.748 12.7538 227.748 12.7538 227.748 12.7538C227.837 12.8446 227.959 12.8968 228.086 12.8992C228.214 12.9017 228.337 12.8541 228.43 12.7667L228.43 12.7667L232.89 8.5626C232.932 8.52376 232.965 8.47717 232.988 8.4255C233.011 8.37383 233.024 8.31809 233.026 8.26146C233.027 8.20483 233.018 8.14842 232.998 8.09547C232.978 8.04253 232.947 7.99408 232.908 7.95287ZM232.908 7.95287L232.799 8.05571L232.908 7.95281C232.908 7.95283 232.908 7.95285 232.908 7.95287Z"
        fill="white"
        stroke="white"
        strokeWidth="0.3"
      />
      <Line
        x1="19"
        y1="10.5"
        x2="119"
        y2="10.5"
        stroke="#272728"
        strokeDasharray="10 10"
      />
    </>
  );
};
