import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VexelAndDelivery from "../../screens/Profile/VexelAndDelivery/VexelAndDelivery";
import Profile from "../../screens/Profile/Profile";
import PurchaseReturns from "../../screens/Profile/PurchaseReturns/PurchaseReturns";
import Contacts from "../../screens/Profile/Contacts/Contacts";
import MyAddresses from "../../screens/Profile/MyAddresses/MyAddresses";
import HistoryOrders from "../../screens/Profile/HistoryOrders/HistoryOrders";
import OrderFullInfo from "../../screens/Profile/OrderFullInfo/OrderFullInfo";
import TermsOfUse from "../../screens/Profile/TermsOfUse/TermsOfUse";

export type ProfileStackParamList = {
  Profile: undefined;
  VexelAndDelivery: undefined;
  PurchaseReturns: undefined;
  Contacts: undefined;
  MyAddresses: undefined;
  HistoryOrders: undefined;
  TermsOfUse: undefined;
  OrderFullInfo: { id: number; headerTitle: string };
};

const ProfileNav = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileNavigation = () => {
  return (
    <ProfileNav.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerShown: false }}
    >
      <ProfileNav.Screen name="Profile" component={Profile} />
      <ProfileNav.Screen name="VexelAndDelivery" component={VexelAndDelivery} />
      <ProfileNav.Screen name="PurchaseReturns" component={PurchaseReturns} />
      <ProfileNav.Screen name="MyAddresses" component={MyAddresses} />
      <ProfileNav.Screen name="Contacts" component={Contacts} />
      <ProfileNav.Screen name="HistoryOrders" component={HistoryOrders} />
      <ProfileNav.Screen name="TermsOfUse" component={TermsOfUse} />
      <ProfileNav.Screen name="OrderFullInfo" component={OrderFullInfo} />
    </ProfileNav.Navigator>
  );
};
