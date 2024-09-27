import { View, Text, TouchableOpacity } from "react-native";
import Header from "../../../src/components/header/Header";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import BlockSocial from "../../../src/components/block-social/BlockSocial";
import RegistrationEmail from "../../../src/components/registration-email/RegistrationEmail";
import RegistrationPhone from "../../../src/components/registration-phone/RegistrationPhone";
import Layout from "../../../src/components/layout/Layout";

const Registration = () => {
  const { goBack } = useNavigation();

  const [phoneTab, setPhoneTab] = useState(true);
  const [emailTab, setEmailTab] = useState(false);

  return (
    <Layout
      noMenu
      isNotification
      header={
        <Header
          title="Регистрация"
          navigationHandle={() => goBack()}
          leftIcon
        />
      }
    >
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <View style={{ marginTop: 30 }}>
          <Text
            style={{
              fontSize: 18,
              color: "#272728",
              fontWeight: "600",
            }}
          >
            Пройти регитсрацию через:
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: 40,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setEmailTab(!emailTab);
              setPhoneTab(!phoneTab);
            }}
            style={{
              borderBottomColor: phoneTab ? "#DE002B" : "transparent",
              borderBottomWidth: phoneTab ? 0.8 : 0,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: phoneTab ? "#272728" : "#898E9F",
                fontWeight: "600",
                paddingBottom: 2,
              }}
            >
              Номер
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setEmailTab(!emailTab);
              setPhoneTab(!phoneTab);
            }}
            style={{
              marginLeft: 20,
              borderBottomColor: emailTab ? "#DE002B" : "transparent",
              borderBottomWidth: emailTab ? 0.8 : 0,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: emailTab ? "#272728" : "#898E9F",
                fontWeight: "600",
                paddingBottom: 2,
              }}
            >
              Почту
            </Text>
          </TouchableOpacity>
        </View>

        {phoneTab && <RegistrationPhone />}
        {emailTab && <RegistrationEmail />}

        <View style={{ marginTop: 20, alignItems: "center" }}>
          <Text
            style={{
              fontSize: 18,
              color: "#272728",
              fontWeight: "600",
            }}
          >
            Войти через:
          </Text>
        </View>

        <BlockSocial _styles={{ marginTop: 15 }} />
      </View>
    </Layout>
  );
};

export default Registration;
