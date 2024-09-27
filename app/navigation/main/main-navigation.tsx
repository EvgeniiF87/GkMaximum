import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  MainTabNavigation,
  MainTabStackParamList,
} from "../tabs/main-tab-navigation";
import { NavigatorScreenParams } from "@react-navigation/native";

export type MainStackParamList = {
  Tabs: NavigatorScreenParams<MainTabStackParamList>;
};

const MainNav = createNativeStackNavigator<MainStackParamList>();

export const MainNavigation = () => {
  return (
    <MainNav.Navigator screenOptions={{ headerShown: false }}>
      <MainNav.Screen name="Tabs" component={MainTabNavigation} />
    </MainNav.Navigator>
  );
};
