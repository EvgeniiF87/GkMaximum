import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/Home/Home";
import News from "../../screens/Home/News/News";
import Hits from "../../screens/Home/Hits/Hits";
import Promotions from "../../screens/Home/Promotions/Promotions";
import Recomendation from "../../screens/Home/Recomendation/Recomendation";
import SelectionCity from "../../screens/Home/SelectionCity/SelectionCity";
import ProductFullInfo from "../../screens/Home/ProductFullInfo/ProductFullInfo";
import ProductReviews from "../../screens/Home/ProductReviews/ProductReviews";
import HomeCatalogProducts from "../../screens/Home/HomeCatalogProducts/HomeCatalogProducts";

export type HomeStackParamListType = {
  Home: () => void;
  SelectionCity: () => void;
  News: () => void;
  Hits: () => void;
  Promotions: () => void;
  Recomendation: () => void;
};

export type SelectionCityType = "home" | "start" | "profile";

export type HomeStackParamList = {
  Home: undefined;
  SelectionCity: { type: SelectionCityType | undefined };
  News: undefined;
  Hits: undefined;
  Promotions: undefined;
  Recomendation: undefined;
  HomeCatalogProducts: { searchQuery?: string };
  ProductFullInfo: {
    id: number;
    whatComeScreen?: "search";
    searchQuery?: string;
  };
  ProductReviews: { id: number | undefined };
};

const HomeNav = createNativeStackNavigator<HomeStackParamList>();

export const HomeNavigation = () => {
  return (
    <HomeNav.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <HomeNav.Screen name="Home" component={Home} />
      <HomeNav.Screen name="SelectionCity" component={SelectionCity} />
      <HomeNav.Screen name="News" component={News} />
      <HomeNav.Screen name="Hits" component={Hits} />
      <HomeNav.Screen name="Promotions" component={Promotions} />
      <HomeNav.Screen name="Recomendation" component={Recomendation} />
      <HomeNav.Screen name="ProductFullInfo" component={ProductFullInfo} />
      <HomeNav.Screen name="ProductReviews" component={ProductReviews} />
      <HomeNav.Screen
        name="HomeCatalogProducts"
        component={HomeCatalogProducts}
      />
    </HomeNav.Navigator>
  );
};
