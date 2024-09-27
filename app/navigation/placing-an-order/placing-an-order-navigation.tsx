import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlacingAnOreder from "../../screens/Basket/PlacingAnOrder/PlacingAnOreder";
import PlacingAnOrderAddressDelivery from "../../screens/Basket/PlacingAnOrder/PlacingAnOrderAddressDelivery/PlacingAnOrderAddressDelivery";
import { IMyAddress } from "../../entities/MyAddress/types/my-address-types";
import PlacingAnOrderAddAddressDelivery from "../../screens/Basket/PlacingAnOrder/PlacingAnOrderAddAddressDelivery/PlacingAnOrderAddAddressDelivery";
import PlacingAnOrderUserRecipient from "../../screens/Basket/PlacingAnOrder/PlacingAnOrderUserRecipient/PlacingAnOrderUserRecipient";

export type AddAddressPropsType = "add" | "edit" | "order";

export type PlacingAnOrederStackParamList = {
  Oreder: undefined;
  PlacingAnOrderAddressDelivery: undefined;
  PlacingAnOrderUserRecipient: undefined;
  PlacingAnOrderAddAddressDelivery: {
    type: AddAddressPropsType;
    address?: IMyAddress;
  };
};

const PlacingAnOrederNav =
  createNativeStackNavigator<PlacingAnOrederStackParamList>();

export const PlacingAnOrederNavigation = () => {
  return (
    <PlacingAnOrederNav.Navigator
      initialRouteName="Oreder"
      screenOptions={{ headerShown: false }}
    >
      <PlacingAnOrederNav.Screen name="Oreder" component={PlacingAnOreder} />
      <PlacingAnOrederNav.Screen
        name="PlacingAnOrderAddressDelivery"
        component={PlacingAnOrderAddressDelivery}
      />
      <PlacingAnOrederNav.Screen
        name="PlacingAnOrderAddAddressDelivery"
        component={PlacingAnOrderAddAddressDelivery}
      />
      <PlacingAnOrederNav.Screen
        name="PlacingAnOrderUserRecipient"
        component={PlacingAnOrderUserRecipient}
      />
    </PlacingAnOrederNav.Navigator>
  );
};
