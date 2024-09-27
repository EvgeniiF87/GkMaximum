import { useNavigation } from "@react-navigation/native";
import { HomeStackParamListType } from "../home/home-navigation";
import { AppPropsScreen } from "./app-navigation";
import {
  AuthStackParamListType,
  CheckCodeType,
  RegistrationSuccessType,
} from "../auth/auth-navigation";

const navigation = useNavigation<AppPropsScreen>();

const HomeTab: HomeStackParamListType = {
  Home: () =>
    navigation.navigate("Main", {
      screen: "Tabs",
      params: { screen: "TabHome", params: { screen: "Home" } },
    }),
  SelectionCity: () =>
    navigation.navigate("Main", {
      screen: "Tabs",
      params: { screen: "TabHome", params: { screen: "SelectionCity" } },
    }),
  News: () =>
    navigation.navigate("Main", {
      screen: "Tabs",
      params: { screen: "TabHome", params: { screen: "News" } },
    }),
  Hits: () =>
    navigation.navigate("Main", {
      screen: "Tabs",
      params: { screen: "TabHome", params: { screen: "Hits" } },
    }),
  Promotions: () =>
    navigation.navigate("Main", {
      screen: "Tabs",
      params: { screen: "TabHome", params: { screen: "Promotions" } },
    }),
  Recomendation: () =>
    navigation.navigate("Main", {
      screen: "Tabs",
      params: { screen: "TabHome", params: { screen: "Recomendation" } },
    }),
};

const Auth: AuthStackParamListType = {
  Registration: navigation.navigate("Auth", { screen: "Registration" }),
  LoginEmail: navigation.navigate("Auth", { screen: "LoginEmail" }),
  RestoreAccessEmail: navigation.navigate("Auth", {
    screen: "RestoreAccessEmail",
  }),
  ChangePassword: (code?: number | undefined) =>
    navigation.navigate("Auth", {
      screen: "ChangePassword",
      params: { code },
    }),
  CheckCode: (
    type: CheckCodeType,
    phone?: string,
    phoneFormat?: string,
    email?: string
  ) =>
    navigation.navigate("Auth", {
      screen: "CheckCode",
      params: { type, phone, phoneFormat, email },
    }),
  RegistrationSuccess: (type: RegistrationSuccessType) =>
    navigation.navigate("Auth", {
      screen: "RegistrationSuccess",
      params: { type },
    }),
};

export const AppRoutesList = {
  HomeTab,
  Auth,
  GoBack: navigation.goBack(),
};
