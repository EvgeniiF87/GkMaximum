import { Text, Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { listTabs } from "./list-tabs";
import { Icon } from "../../src/components/Icon/Icon";
import { BasketCounterBadges } from "../../src/components/basket-counter-badge/BasketCounterBadge";
import { useAppSelector } from "../../src/hooks/redux";
import { NavigatorScreenParams } from "@react-navigation/native";
import { HomeStackParamList } from "../home/home-navigation";
import { ProfileStackParamList } from "../profile/profile-navigation";
import { CatalogAndSearchStackParamList } from "../catalog-and-search/catalog-and-search-navigation";

export type MainTabStackParamList = {
  TabHome: NavigatorScreenParams<HomeStackParamList>;
  TabCatalogAndSearch: NavigatorScreenParams<CatalogAndSearchStackParamList>;
  TabFavorites: undefined;
  TabBasket: undefined;
  TabProfile: NavigatorScreenParams<ProfileStackParamList>;
};

const Tab = createBottomTabNavigator<MainTabStackParamList>();

export const MainTabNavigation = () => {
  const { bottom } = useSafeAreaInsets();
  return (
    <Tab.Navigator
      initialRouteName="TabHome"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          height: 60,
          paddingTop: Platform.OS === "ios" ? 20 : 18,
          paddingBottom: Platform.OS === "ios" ? 0 : 5,
          borderTopColor: "#898E9F",
          marginBottom: bottom,
        },
      }}
    >
      {listTabs.map(({ name, component, label, icon, viewBox }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            tabBarLabel: ({ focused }) => {
              return (
                <Text
                  style={{
                    color: focused ? "#272728" : "#898E9F",
                    fontSize: 12,
                    paddingVertical: 0,
                  }}
                >
                  {label}
                </Text>
              );
            },
            headerShown: false,
            tabBarShowLabel: true,
            tabBarIcon: (props) => {
              const { count } = useAppSelector((state) => state.basketReducer);
              const { isAuth } = useAppSelector((state) => state.userReducer);
              const color =
                name !== "TabHome" && props.focused
                  ? "#272728"
                  : name === "TabHome" && props.focused
                  ? "#DE002B"
                  : "#898E9F";
              return (
                <View style={{ marginBottom: 15 }}>
                  {name === "TabBasket" && isAuth && count > 0 && (
                    <BasketCounterBadges />
                  )}
                  <Icon viewBox={viewBox} size={24} path={icon(color)} />
                </View>
              );
            },
          }}
        />
      ))}
    </Tab.Navigator>
  );
};
