import { View, Text, TouchableOpacity, Image } from "react-native";
import { MaskedText } from "react-native-mask-text";
import * as Linking from "expo-linking";
import Layout from "../../src/components/layout/Layout";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "../../src/components/Icon/Icon";
import { AppIcons } from "../../src/Icons";
import BlockArrowRight from "../../src/components/block-arrow-right/BlockArrowRight";
import { AppPropsScreen } from "../../navigation/routes/app-navigation";
import { useAppSelector } from "../../src/hooks/redux";
import NotAuthProfile from "../../src/components/profile-screen/not-auth-profile/NotAuthProfile";
import AuthProfile from "../../src/components/profile-screen/auth-profile/AuthProfile";
import BlockLogout from "../../src/components/profile-screen/auth-profile/BlockLogout";
import { devApiImgUrl } from "../../api/config/config";

const Profile = () => {
  const { navigate } = useNavigation<AppPropsScreen>();
  const { isAuth, user } = useAppSelector((state) => state.userReducer);

  const contactsHandle = () => {
    navigate("Main", {
      screen: "Tabs",
      params: { screen: "TabProfile", params: { screen: "Contacts" } },
    });
  };

  return (
    <Layout>
      {isAuth ? <AuthProfile /> : <NotAuthProfile />}

      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <Text
          style={{
            fontSize: 18,
            color: "#272728",
            fontWeight: "600",
          }}
        >
          О нас
        </Text>
      </View>
      <TouchableOpacity
        style={{ paddingHorizontal: 20, marginTop: 30, flexDirection: "row" }}
        onPress={() => {
          if (user.role === "wholesaler") {
            Linking.openURL(
              `tel:+7${user.manager?.phone ? user.manager?.phone : 9058750550}`
            );
          } else {
            Linking.openURL("tel:8-(905)-875-05-50");
          }
        }}
      >
        <View>
          {user.role === "wholesaler" ? (
            <>
              {user.manager?.img ? (
                <Image
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 30,
                    resizeMode: user.avatar ? "cover" : "contain",
                  }}
                  source={{ uri: `${devApiImgUrl}/${user.manager.img}` }}
                />
              ) : (
                <Icon
                  viewBox="56 56"
                  size={56}
                  path={AppIcons.app.defaultManagerAvatar()}
                />
              )}
            </>
          ) : (
            <Icon viewBox="47 47" size={45} path={AppIcons.app.headsetHelp()} />
          )}
        </View>
        <View
          style={{ marginLeft: 10, justifyContent: "space-around", rowGap: 3 }}
        >
          {user.role === "wholesaler" && (
            <Text style={{ fontSize: 10, fontWeight: "400" }}>
              Ваш персональный менеджер
            </Text>
          )}
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            {user.role === "wholesaler"
              ? user.manager?.fio
              : "Служба поддержки"}
          </Text>
          <Text style={{ fontSize: 15 }}>
            {user.role === "wholesaler" ? (
              <MaskedText mask="+7 (999) 999-99-99">
                {user.manager?.phone || "8-(905)-875-05-50"}
              </MaskedText>
            ) : (
              "8-(905)-875-05-50"
            )}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
        <BlockArrowRight
          title="Контакты"
          titleFontSize={16}
          paddingHorizontal={0}
          marginVertical={8}
          navigationHandle={contactsHandle}
        />
      </View>
      <View style={{ paddingHorizontal: 20, marginTop: 15 }}>
        <Text style={{ color: "#898E9F", fontSize: 14 }}>
          Пн. - Пт.: с 9:00 до 18:00
        </Text>
        <Text style={{ color: "#898E9F", fontSize: 14 }}>
          Сб.: с 10:00 до 17:00
        </Text>
      </View>
      {isAuth && <BlockLogout />}
    </Layout>
  );
};

export default Profile;
