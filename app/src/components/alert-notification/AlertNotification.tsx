import { useRef, useEffect } from "react";
import { Animated, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  setIsAlertNotification,
  setAlertNotificationMessage,
  setAlertNotificationType,
} from "../../../store/reducers/AppSlice";
import { Icon } from "../Icon/Icon";
import { AppIcons } from "../../Icons";

const NotificationsAlert = () => {
  const { top } = useSafeAreaInsets();
  const topAnimation = useRef(new Animated.Value(top)).current;
  const opacityAnimation = useRef(new Animated.Value(0)).current;
  const {
    isAlertNotification,
    alertNotificationMessage,
    alertNotificationType,
  } = useAppSelector((state) => state.AppReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timeoutAlertNotification = setTimeout(() => {
      dispatch(setIsAlertNotification(false));
      dispatch(setAlertNotificationMessage(""));
      dispatch(setAlertNotificationType(""));
    }, 6000);

    if (isAlertNotification) timeoutAlertNotification;

    return () => clearTimeout(timeoutAlertNotification);
  }, [isAlertNotification]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(topAnimation, {
        toValue: isAlertNotification ? 0 : -top,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnimation, {
        toValue: isAlertNotification ? 1 : 0,
        duration: 2800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isAlertNotification]);

  if (!isAlertNotification) {
    return null;
  }

  return (
    <Animated.View
      style={{
        position: "absolute",
        transform: [{ translateY: topAnimation }],
        // top: 0,
        opacity: opacityAnimation,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor:
          alertNotificationType === "error"
            ? "#F9E5E5"
            : alertNotificationType === "success"
            ? "#F1F9E7"
            : "#F9F9F9",
        paddingLeft: 15,
        paddingRight: 30,
        paddingVertical: 10,
        borderBottomLeftRadius: 8,
        zIndex: 2,
      }}
    >
      {alertNotificationType === "success" ? (
        <Icon viewBox="50 35" size={20} path={AppIcons.app.checkMark()} />
      ) : alertNotificationType === "error" ? (
        <Icon viewBox="24 24" size={20} path={AppIcons.app.clarityError()} />
      ) : (
        <Icon viewBox="16 16" size={14} path={AppIcons.app.arrowRotate()} />
      )}

      <Text style={{ marginLeft: 10, fontSize: 14 }}>
        {alertNotificationMessage}
      </Text>
    </Animated.View>
  );
};

export default NotificationsAlert;
