import messaging from "@react-native-firebase/messaging";
import { Alert, PermissionsAndroid, Platform } from "react-native";
import { useAppDispatch } from "./redux";
import { setDevicePushToken } from "../../store/reducers/AppSlice";

export const useAppPushNotification = () => {
  const dispatch = useAppDispatch();

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
    return enabled;
  };

  const appPushNotification = () => {
    if (Platform.OS === "android") {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
    }

    (async () => {
      if (await requestUserPermission()) {
        messaging()
          .getToken()
          .then((token) => {
            console.log({ token });
            Alert.alert(
              "Токен устройства для отправки уведомлений",
              JSON.stringify(token)
            );
            dispatch(setDevicePushToken(token));
          });
      } else {
        console.log("failed get token");
      }
    })();

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(remoteMessage.notification);
        }
      });

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });
  };

  return { appPushNotification };

  // const unsubscribe = messaging().onMessage(async (remoteMessage) => {
  //   Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
  // });

  // return unsubscribe;
};
