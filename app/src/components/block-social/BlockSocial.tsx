import { FC } from "react";
import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";
import VKLogin from "react-native-vkontakte-login";
import { Icon } from "../Icon/Icon";
import { AppIcons } from "../../Icons";
import { useAppLogs } from "../../hooks/AppLogs";
import { IContext } from "../../../entities/Logs/types/logs-types";

type BlockSocialProps = {
  _styles?: StyleProp<ViewStyle>;
};

const BlockSocial: FC<BlockSocialProps> = ({ _styles }) => {
  const { authVkSendLogs } = useAppLogs();
  const loginWithVK = async () => {
    try {
      const loginData = await VKLogin.login(["email"]);
      const contextLog: IContext = {
        message: "успешная авторизация",
        status: "success",
        body: loginData,
      };
      authVkSendLogs(contextLog, "success", "dev");
      console.log(loginData);
    } catch (error) {
      const contextLog: IContext = {
        message: "авторизация отменена",
        status: "error",
        body: { error },
      };
      authVkSendLogs(contextLog, "error", "dev");
      console.error(error);
    }
  };

  return (
    <View
      style={[
        {
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        },
        _styles,
      ]}
    >
      <TouchableOpacity style={{ marginHorizontal: 5 }}>
        <Icon viewBox="37 37" size={40} path={AppIcons.app.google()} />
      </TouchableOpacity>
      <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={loginWithVK}>
        <Icon viewBox="37 37" size={40} path={AppIcons.app.wk()} />
      </TouchableOpacity>
      <TouchableOpacity style={{ marginHorizontal: 5 }}>
        <Icon viewBox="37 37" size={40} path={AppIcons.app.instagram()} />
      </TouchableOpacity>
      <TouchableOpacity style={{ marginHorizontal: 5 }}>
        <Icon viewBox="37 37" size={40} path={AppIcons.app.apple()} />
      </TouchableOpacity>
    </View>
  );
};

export default BlockSocial;
