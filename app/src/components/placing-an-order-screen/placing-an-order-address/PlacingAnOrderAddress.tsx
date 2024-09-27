import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "../../Icon/Icon";
import { AppIcons } from "../../../Icons";
import { useNavigation } from "@react-navigation/native";
import { AppPropsScreen } from "../../../../navigation/routes/app-navigation";
import { useAppSelector } from "../../../hooks/redux";

const PlacingAnOrderAddress = () => {
  const { navigate } = useNavigation<AppPropsScreen>();
  const [isMainAddress, setIsMainAddress] = useState<boolean>(false);
  const [street, setStreet] = useState<string | undefined>("");
  const {
    user: { my_address },
  } = useAppSelector((state) => state.userReducer);

  const addressHandle = () => {
    if (my_address?.length) {
      navigate("PlacingAnOrder", { screen: "PlacingAnOrderAddressDelivery" });
    } else {
      navigate("PlacingAnOrder", {
        screen: "PlacingAnOrderAddAddressDelivery",
        params: { type: "add" },
      });
    }
  };

  useEffect(() => {
    if (my_address?.length) {
      my_address?.map((address) => {
        if (address.isMain === 1) {
          setStreet(address.house_street);
          setIsMainAddress(true);
        }
      });
    } else {
      setIsMainAddress(false);
      setStreet("");
    }
  }, [my_address]);

  return (
    <TouchableOpacity onPress={addressHandle}>
      <View
        style={{
          borderColor: "#D1D3DE",
          borderBottomWidth: 0.7,
          paddingVertical: 10,
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={{
              color: "#272728",
              fontSize: 18,
              fontWeight: "600",
              lineHeight: 23.4,
            }}
          >
            Адрес
          </Text>
          {isMainAddress ? (
            <Text
              style={{
                color: "#272728",
                fontSize: 14,
                fontWeight: "400",
                lineHeight: 22.4,
              }}
            >
              {street}
            </Text>
          ) : (
            <Text
              style={{
                color: "#898E9F",
                fontSize: 14,
                fontWeight: "400",
                lineHeight: 22.4,
              }}
            >
              введите адрес доставки
            </Text>
          )}
        </View>

        <Icon viewBox="8 14" size={15} path={AppIcons.app.arrowRight()} />
      </View>
    </TouchableOpacity>
  );
};

export default PlacingAnOrderAddress;
