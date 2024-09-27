import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";

export type alertNotificationTypeType =
  | "success"
  | "error"
  | "product"
  | ""
  | undefined;

export type appAlertComponentType =
  | "favorite"
  | "notification"
  | "basket"
  | "deleteAccount"
  | "deleteAdress"
  | "";

interface IApp {
  firstStartApp: boolean;
  isLoading: boolean;
  isAppAlert: boolean;
  isSpiner: boolean;
  titleSpiner: string;
  appAlertComponent: appAlertComponentType;
  isAlertNotification: boolean;
  alertNotificationMessage?: string | undefined;
  alertNotificationType: Partial<alertNotificationTypeType>;
  devicePushToken: string;
}

const initialState: IApp = {
  firstStartApp: true,
  isLoading: true,
  isAppAlert: false,
  isSpiner: false,
  titleSpiner: "",
  appAlertComponent: "",
  isAlertNotification: false,
  alertNotificationMessage: "",
  alertNotificationType: "",
  devicePushToken: "",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setFirstStartApp(state, action: PayloadAction<boolean>) {
      state.firstStartApp = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setIsAppAlert(state, action: PayloadAction<boolean>) {
      state.isAppAlert = action.payload;
    },
    setAppAlertComponent(state, action: PayloadAction<appAlertComponentType>) {
      state.appAlertComponent = action.payload;
    },
    setIsAlertNotification(state, action: PayloadAction<boolean>) {
      state.isAlertNotification = action.payload;
    },
    setAlertNotificationMessage(
      state,
      action: PayloadAction<string | undefined>
    ) {
      state.alertNotificationMessage = action.payload;
    },
    setAlertNotificationType(
      state,
      action: PayloadAction<alertNotificationTypeType>
    ) {
      state.alertNotificationType = action.payload;
    },

    setIsSpiner(state, action: PayloadAction<boolean>) {
      state.isSpiner = action.payload;
    },

    setTitleSpiner(state, action: PayloadAction<string>) {
      state.titleSpiner = action.payload;
    },

    setDevicePushToken(state, action: PayloadAction<string>) {
      state.devicePushToken = action.payload;
    },

    resetSpiner(state) {
      (state.isSpiner = false), (state.titleSpiner = "");
    },

    resetAppAlert(state) {
      state.isAppAlert = false;
      state.appAlertComponent = "";
    },
  },
});

export const {
  setIsLoading,
  setIsAlertNotification,
  setAlertNotificationMessage,
  setAlertNotificationType,
  setFirstStartApp,
  setIsAppAlert,
  setAppAlertComponent,
  resetAppAlert,
  setIsSpiner,
  setTitleSpiner,
  resetSpiner,
  setDevicePushToken,
} = appSlice.actions;

export default appSlice.reducer;
