import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { AppNavigation } from "./app/navigation/routes/app-navigation";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./app/store/store";
import VKLogin from "react-native-vkontakte-login";
import * as Linking from "expo-linking";
import { Platform } from "react-native";

export default function App() {
  const [appLoaded, setAppLoaded] = useState(false);

  const iosVkAppID = Number(process.env.EXPO_PUBLIC_VK_APP_IOS_ID);
  const androidVkAppID = Number(process.env.EXPO_PUBLIC_VK_APP_ANDROID_ID);

  const appVKID = Platform.OS === "android" ? androidVkAppID : iosVkAppID;

  console.log(appVKID);

  const linking = {
    prefixes: ["https://gkmaximum.backend.demowts.ru"],
    config: {
      screens: {
        Profile: "/auth",
      },
    },
  };

  const coldStartApplication = () => {
    SplashScreen.preventAutoHideAsync();
    setAppLoaded(true);
  };

  useEffect(() => {
    VKLogin.initialize(appVKID);
    coldStartApplication();
    if (appLoaded) {
      (async () => await SplashScreen.hideAsync())();
    }
    const handleUrl = (event) => {
      console.log(event.url);
    };

    Linking.addEventListener("url", handleUrl);
  }, [appLoaded]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar style="auto" backgroundColor="#fff" />
        <SafeAreaProvider style={{ backgroundColor: "#fff", zIndex: 900 }}>
          <NavigationContainer linking={linking}>
            <AppNavigation />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
