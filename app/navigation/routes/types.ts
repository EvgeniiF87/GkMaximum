import { JSX } from "react";
import { MainTabStackParamList } from "../tabs/main-tab-navigation";

export type mainTabNavigationType = {
  name: keyof MainTabStackParamList;
  component: () => JSX.Element;
  label: string;
  viewBox: string;
  listeners?: () => void;
  icon: (color: string) => JSX.Element;
};
