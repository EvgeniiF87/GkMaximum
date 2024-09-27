import { View, Text, TouchableOpacity, Image } from "react-native";
import { Icon } from "../../Icon/Icon";
import { AppIcons } from "../../../Icons";
import DefaultAvatar from "../../../../../assets/default-avatar.png";
import { useAppSelector } from "../../../hooks/redux";
import { useNavigation } from "@react-navigation/native";
import { AppPropsScreen } from "../../../../navigation/routes/app-navigation";
import { devApiAvatarUrl } from "../../../../api/config/config";

const BlockUserInfo = () => {
  const { user } = useAppSelector((state) => state.userReducer);
  const { navigate } = useNavigation<AppPropsScreen>();

  const userInfo = () => {
    navigate("UserInfo");
  };

  return (
    <TouchableOpacity
      onPress={userInfo}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginVertical: 20,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "#FFB8C6",
          }}
        >
          <Image
            source={
              user.avatar
                ? { uri: `${devApiAvatarUrl}/${user.avatar}` }
                : DefaultAvatar
            }
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              resizeMode: user.avatar ? "cover" : "contain",
            }}
          />
        </View>
        <View style={{ marginLeft: 10, rowGap: 4 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "700",
              color: "#272728",
            }}
          >
            {user.name ? user.name : "Пользователь"}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "400",
              color: "#898E9F",
            }}
          >
            Личные данные
          </Text>
        </View>
      </View>
      <Icon viewBox="8 14" size={15} path={AppIcons.app.arrowRight()} />
    </TouchableOpacity>
  );
};

export default BlockUserInfo;
