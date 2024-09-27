import { Text, View, Image, Dimensions } from "react-native";
import Layout from "../../../src/components/layout/Layout";
import Header from "../../../src/components/header/Header";
import { useNavigation } from "@react-navigation/native";
import { AppPropsScreen } from "../../../navigation/routes/app-navigation";
import ButtonOutline from "../../../src/ui/ButtonOutline.tsx/ButtonOutline";
import { useAppSelector } from "../../../src/hooks/redux";

const { width } = Dimensions.get("window");
const height = (width / 100) * 60;

const BonusCardQrCode = () => {
  const { goBack } = useNavigation<AppPropsScreen>();
  const {
    user: { bonus_qr },
  } = useAppSelector((state) => state.userReducer);

  return (
    <Layout
      noMenu
      header={
        <Header title="Бонусная карта" leftIcon navigationHandle={goBack} />
      }
    >
      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <Text
          style={{
            fontSize: 16,
            color: "#272728",
            fontWeight: "600",
            lineHeight: 20.8,
          }}
        >
          Ваш QR-код
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#272728",
            fontWeight: "400",
            lineHeight: 22.4,
          }}
        >
          Покажите QR-код на кассе, чтобы вам начислялись бонусы
        </Text>
      </View>

      <View
        style={{
          paddingHorizontal: 20,
          marginTop: 60,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: bonus_qr }}
          style={{ width: width - 100, height }}
        />
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 60 }}>
        <ButtonOutline
          title="Обновить код"
          onPressHandle={() => {}}
          type={"dark"}
        />
      </View>
    </Layout>
  );
};

export default BonusCardQrCode;
