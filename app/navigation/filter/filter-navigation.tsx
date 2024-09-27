import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Filter from "../../screens/Home/Filter/Filter";

export type FilterStackParamList = {
  Main: undefined;
};

const FilterNav = createNativeStackNavigator<FilterStackParamList>();

export const FilterNavigation = () => {
  return (
    <FilterNav.Navigator
      initialRouteName="Main"
      screenOptions={{ headerShown: false }}
    >
      <FilterNav.Screen name="Main" component={Filter} />
    </FilterNav.Navigator>
  );
};
