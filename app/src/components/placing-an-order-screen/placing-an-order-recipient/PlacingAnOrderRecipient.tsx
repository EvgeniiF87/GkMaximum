import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { AppPropsScreen } from "../../../../navigation/routes/app-navigation";
import { Icon } from "../../Icon/Icon";
import { AppIcons } from "../../../Icons";
import { useAppSelector } from "../../../hooks/redux";
import { MaskedText } from "react-native-mask-text";
import { useEffect, useState } from "react";

const PlacingAnOrderRecipient = () => {
  const { navigate } = useNavigation<AppPropsScreen>();

  const {
    user: { name: userName, phone: userPhone },
  } = useAppSelector((state) => state.userReducer);
  const { recipient } = useAppSelector((state) => state.OrderReducer);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const recipientHandle = () => {
    navigate("PlacingAnOrder", { screen: "PlacingAnOrderUserRecipient" });
  };

  useEffect(() => {
    setName(recipient.name.length ? recipient.name : userName ?? "");
    setPhone(recipient.phone.length ? recipient.phone : userPhone ?? "");
  }, [recipient]);

  return (
    <TouchableOpacity onPress={recipientHandle}>
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
            Получатель
          </Text>
          {phone.length > 0 && name.length > 0 ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  color: "#272728",
                  fontSize: 14,
                  fontWeight: "400",
                  lineHeight: 22.4,
                  marginRight: 8,
                }}
              >
                {name}
              </Text>
              <MaskedText style={styles.phoneStyle} mask="+7 (999) 999-99-99">
                {phone}
              </MaskedText>
            </View>
          ) : (
            <Text
              style={{
                color: "#898E9F",
                fontSize: 14,
                fontWeight: "400",
                lineHeight: 22.4,
              }}
            >
              введите контактные данные
            </Text>
          )}
        </View>

        <Icon viewBox="8 14" size={15} path={AppIcons.app.arrowRight()} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  phoneStyle: {
    color: "#272728",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 22.4,
  },
});

export default PlacingAnOrderRecipient;
