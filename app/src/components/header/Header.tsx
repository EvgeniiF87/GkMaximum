import { FC } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { Icon } from "../Icon/Icon";
import { AppIcons } from "../../Icons";
import Tooltip from "../tooltip/Tooltip";

type HeaderProps = {
  title?: string;
  titleColor?: string;
  backgroundColor?: string;
  paddingVertical?: number;
  showNotificationProductTooltip?: boolean;
  crossIcon?: boolean;
  crossIconHandle?: () => void;
  favoritesIcon?: boolean;
  favoritesIconHandle?: () => void;
  addedCurrentProductInFavorite?: boolean;
  notificationIcon?: boolean;
  notificationIconColor?: string;
  notificationIconHandle?: () => void;
  leftIcon?: boolean;
  leftIconColor?: string;
  navigationHandle?: () => void;
};

const Header: FC<HeaderProps> = ({
  title,
  titleColor,
  backgroundColor,
  paddingVertical,
  showNotificationProductTooltip,
  navigationHandle,
  crossIcon,
  crossIconHandle,
  favoritesIcon,
  favoritesIconHandle,
  addedCurrentProductInFavorite,
  notificationIcon,
  notificationIconColor = "#898E9F",
  notificationIconHandle,
  leftIcon,
  leftIconColor,
}) => {
  return (
    <View
      style={[
        Platform.select({
          android: {
            marginTop: 20,
          },
        }),
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: paddingVertical ? paddingVertical : 20,
          backgroundColor: backgroundColor ? backgroundColor : "#fff",
          zIndex: 1,
        },
      ]}
    >
      {crossIcon && (
        <TouchableOpacity
          onPress={crossIconHandle}
          style={{ position: "absolute", top: 18, right: 20 }}
        >
          <Icon viewBox="24 24" size={26} path={AppIcons.app.cross()} />
        </TouchableOpacity>
      )}

      {favoritesIcon && (
        <TouchableOpacity
          onPress={favoritesIconHandle}
          style={{
            position: "absolute",
            top: 18,
            right: notificationIcon ? 66 : 20,
          }}
        >
          {addedCurrentProductInFavorite ? (
            <Icon
              viewBox="22 20"
              size={26}
              path={AppIcons.app.fillFavorites()}
            />
          ) : (
            <Icon
              viewBox="22 20"
              size={26}
              path={AppIcons.tabNavigationIcons.favorites()}
            />
          )}
        </TouchableOpacity>
      )}

      {notificationIcon && (
        <View style={{ position: "absolute", top: 18, right: 20 }}>
          <TouchableOpacity
            onPress={notificationIconHandle}
            style={{ position: "relative", flexDirection: "row" }}
          >
            <Icon
              viewBox="18 22"
              size={26}
              path={AppIcons.app.notification(notificationIconColor)}
            />
            {showNotificationProductTooltip && <Tooltip />}
          </TouchableOpacity>
        </View>
      )}

      {leftIcon && (
        <TouchableOpacity
          onPress={navigationHandle}
          style={{ position: "absolute", top: 21, left: 20 }}
        >
          <Icon
            viewBox="8 14"
            size={19}
            path={AppIcons.app.arrowLeft(
              leftIconColor ? leftIconColor : "#3E3E40"
            )}
          />
        </TouchableOpacity>
      )}
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          lineHeight: 23,
          color: titleColor ? titleColor : "#272728",
        }}
      >
        {title ? title : ""}
      </Text>
    </View>
  );
};

export default Header;
