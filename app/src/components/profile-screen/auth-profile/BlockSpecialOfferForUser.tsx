import { View, Image, Dimensions, Text } from "react-native";
import SpecialOfferForUserPng from "../../../../../assets/special-offer-for-user.png";

const { width } = Dimensions.get("window");

const BlockSpecialOfferForUser = () => {
  return (
    <View
      style={{
        width,
        height: 74,
        overflow: "hidden",
        position: "relative",
        marginTop: 20,
      }}
    >
      <Image
        source={SpecialOfferForUserPng}
        style={{ width, height: 74, resizeMode: "cover" }}
      />

      <View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          justifyContent: "center",
          paddingLeft: 15,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 14,
            fontWeight: "600",
            lineHeight: 18.2,
          }}
        >
          Свяжитесь с нами, если вы являетесь профессиональным парикмахером и
          получите уникальное предложение от GkMaximum
        </Text>
      </View>
    </View>
  );
};

export default BlockSpecialOfferForUser;
