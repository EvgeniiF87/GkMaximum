import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as Linking from "expo-linking";
import Header from "../../../src/components/header/Header";
import Layout from "../../../src/components/layout/Layout";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "../../../src/components/Icon/Icon";
import { MaskedText } from "react-native-mask-text";
import { useContactList } from "../../../src/hooks/ContactList";

const Contacts = () => {
  const { goBack } = useNavigation();
  const { contactsList } = useContactList();

  const onPressHandle = async (title: string, text: string) => {
    if (title === "Телефон") {
      Linking.openURL(`tel:${text}`);
    } else if (title === "E-mail") {
      await Linking.openURL(`mailto:${text}`);
    }
  };

  return (
    <Layout
      header={<Header title="Контакты" leftIcon navigationHandle={goBack} />}
    >
      <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
        <View>
          <Text
            style={{
              fontSize: 18,
              color: "#272728",
              fontWeight: "600",
              lineHeight: 23,
            }}
          >
            Основной офис компании
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: "#272728",
              fontWeight: "600",
              lineHeight: 23,
            }}
          >
            находится в г.{" "}
            <Text
              style={{
                fontSize: 18,
                color: "#272728",
                fontWeight: "600",
                lineHeight: 23,
                textDecorationLine: "underline",
              }}
            >
              Ижевск
            </Text>
            .
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: "#272728",
              fontWeight: "400",
              lineHeight: 23,
              marginTop: 10,
            }}
          >
            Будем рады Вас видеть.
          </Text>
        </View>

        <View style={{ marginTop: 30 }}>
          {contactsList.map(({ icon, title, text, viewBox }, index) => {
            if (title === "Телефон" || title === "E-mail") {
              return (
                <TouchableOpacity
                  key={index}
                  style={{ marginBottom: 30 }}
                  onPress={() => onPressHandle(title, text)}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Icon viewBox={viewBox} size={20} path={icon} />
                    <Text
                      style={{
                        fontSize: 18,
                        color: "#272728",
                        fontWeight: "600",
                        lineHeight: 23,
                        marginLeft: 10,
                      }}
                    >
                      {title}
                    </Text>
                  </View>
                  {title === "E-mail" ? (
                    <Text
                      style={{
                        fontSize: 18,
                        color: "#272728",
                        fontWeight: "400",
                        lineHeight: 23,
                        marginTop: 10,
                      }}
                    >
                      {text}
                    </Text>
                  ) : (
                    <MaskedText
                      style={styles.phoneStyle}
                      mask="+7 (999) 999-99-99"
                    >
                      {text}
                    </MaskedText>
                  )}
                </TouchableOpacity>
              );
            } else {
              return (
                <View key={index} style={{ marginBottom: 30 }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Icon viewBox={viewBox} size={20} path={icon} />
                    <Text
                      style={{
                        fontSize: 18,
                        color: "#272728",
                        fontWeight: "600",
                        lineHeight: 23,
                        marginLeft: 10,
                      }}
                    >
                      {title}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#272728",
                      fontWeight: "400",
                      lineHeight: 23,
                      marginTop: 10,
                    }}
                  >
                    {text}
                  </Text>
                </View>
              );
            }
          })}
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  phoneStyle: {
    fontSize: 18,
    color: "#272728",
    fontWeight: "400",
    lineHeight: 23,
    marginTop: 10,
  },
});

export default Contacts;
