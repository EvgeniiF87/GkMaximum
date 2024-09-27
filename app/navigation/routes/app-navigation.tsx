import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { MainNavigation, MainStackParamList } from "../main/main-navigation";
import { AuthNavigation, AuthStackParamList } from "../auth/auth-navigation";
import { NavigatorScreenParams } from "@react-navigation/native";
import GeolocationProvider from "../../src/components/geolocation/Geolocation";
import {
  FilterNavigation,
  FilterStackParamList,
} from "../filter/filter-navigation";
import SearchScreen from "../../screens/Search/SearchScreen";
import UserInfo from "../../screens/Profile/UserInfo/UserInfo";
import ApplertProvider from "../../src/components/app-alert/AppAlert";
import AddAddress from "../../screens/Profile/AddAddress/AddAddress";
import BonusCardQrCode from "../../screens/Profile/BonusCardQrCode/BonusCardQrCode";
import { IMyAddress } from "../../entities/MyAddress/types/my-address-types";
import Sorted from "../../screens/Home/Filter/Sorted/Sorted";
import Brands from "../../screens/Home/Filter/Brands/Brands";
import Appointment from "../../screens/Home/Filter/Appointment/Appointment";
import Scale from "../../screens/Home/Filter/Scale/Scale";
import Offers from "../../screens/Home/Filter/Offers/Offers";
import FilterCategories from "../../screens/Home/Filter/Category/FilterCategories";
import { ICategory } from "../../entities/Category/types/category-types";
import FilterSubCategories from "../../screens/Home/Filter/Category/FilterSubCategories/FilterSubCategories";
import FilterSubSubCategories from "../../screens/Home/Filter/Category/FilterSubSubCategories/FilterSubSubCategories";
import { IPriceData } from "../../entities/history-orders/types/history-orders";
import LeaveFeedBack from "../../screens/Profile/LeaveFeedBack/LeaveFeedBack";
import ProductReviewsAllPhotos from "../../screens/Home/ProductReviewsAllPhotos/ProductReviewsAllPhotos";
import {
  PlacingAnOrederNavigation,
  PlacingAnOrederStackParamList,
} from "../placing-an-order/placing-an-order-navigation";
import Onboarding from "../../screens/Onboarding/Onboarding";

export type AddAddressPropsType = "add" | "edit" | "order";

export type AppStackParamList = {
  Onboarding: undefined;
  Main: NavigatorScreenParams<MainStackParamList>;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Filter: NavigatorScreenParams<FilterStackParamList>;
  Sorted: undefined;
  Offers: undefined;
  FilterCategories: undefined;
  FilterSubCategories: { categories: ICategory[]; categoryTitle: string };
  FilterSubSubCategories: { categories: ICategory[]; categoryTitle: string };
  Brands: { brandsList: string[] };
  Appointment: { appointmentList: string[] };
  Scale: { scaleList: string[] };
  Search: { searchQuery?: string };
  UserInfo: undefined;
  BonusCardQrCode: undefined;
  LeaveFeedBack: { product: IPriceData };
  AddAddress: { type: AddAddressPropsType; address?: IMyAddress };
  ProductReviewsAllPhotos: { images: string[]; index?: number };
  PlacingAnOrder: NavigatorScreenParams<PlacingAnOrederStackParamList>;
};

export type AppPropsScreen =
  NativeStackScreenProps<AppStackParamList>["navigation"];

const AppNav = createNativeStackNavigator<AppStackParamList>();

export const AppNavigation = () => {
  return (
    <GeolocationProvider>
      <ApplertProvider>
        <AppNav.Navigator
          initialRouteName="Main"
          screenOptions={{ headerShown: false }}
        >
          <AppNav.Screen name="Main" component={MainNavigation} />
          <AppNav.Screen name="Auth" component={AuthNavigation} />
          <AppNav.Screen name="Filter" component={FilterNavigation} />
          <AppNav.Screen name="Sorted" component={Sorted} />
          <AppNav.Screen name="Offers" component={Offers} />
          <AppNav.Screen name="FilterCategories" component={FilterCategories} />
          <AppNav.Screen
            name="FilterSubCategories"
            component={FilterSubCategories}
          />
          <AppNav.Screen
            name="FilterSubSubCategories"
            component={FilterSubSubCategories}
          />
          <AppNav.Screen name="Onboarding" component={Onboarding} />
          <AppNav.Screen name="Brands" component={Brands} />
          <AppNav.Screen name="Appointment" component={Appointment} />
          <AppNav.Screen name="Scale" component={Scale} />
          <AppNav.Screen name="Search" component={SearchScreen} />
          <AppNav.Screen name="UserInfo" component={UserInfo} />
          <AppNav.Screen name="AddAddress" component={AddAddress} />
          <AppNav.Screen name="LeaveFeedBack" component={LeaveFeedBack} />
          <AppNav.Screen name="BonusCardQrCode" component={BonusCardQrCode} />
          <AppNav.Screen
            name="PlacingAnOrder"
            component={PlacingAnOrederNavigation}
          />
          <AppNav.Screen
            name="ProductReviewsAllPhotos"
            component={ProductReviewsAllPhotos}
          />
        </AppNav.Navigator>
      </ApplertProvider>
    </GeolocationProvider>
  );
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamList {}
  }
}
