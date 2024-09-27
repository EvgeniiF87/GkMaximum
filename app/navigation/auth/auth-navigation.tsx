import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CheckCode from "../../screens/Profile/checkCode/CheckCode";
import Registration from "../../screens/Auth/registration/Registration";
import RegistrationSuccess from "../../screens/Auth/registration-success/RegistrationSuccess";
import LoginEmail from "../../screens/Auth/login/login-email/LoginEmail";
import RestoreAccessEmail from "../../screens/Auth/restore-access/RestoreAccessEmail";
import ChangePassword from "../../screens/Auth/restore-access/ChangePassword";

export type AuthStackParamListType = {
  CheckCode: (
    type: CheckCodeType,
    phone?: string,
    phoneFormat?: string,
    email?: string
  ) => void;
  Registration: void;
  RegistrationSuccess: (type: RegistrationSuccessType) => void;
  LoginEmail: void;
  RestoreAccessEmail: void;
  ChangePassword: (code?: number | undefined) => void;
};

export type CheckCodeType =
  | "login"
  | "registration"
  | "RestoreAccessEmail"
  | "UserInfo";
export type RegistrationSuccessType = "registration" | "RestoreAccessEmail";
export type ChangePasswordType =
  | "UserInfoRestoreAccess"
  | "UserInfo"
  | undefined;
export type RestoreAccessEmailType = "UserInfo" | undefined;
export type AuthStackParamList = {
  CheckCode: {
    phone?: string;
    phoneFormat?: string;
    email?: string;
    type: CheckCodeType;
  };
  Registration: undefined;
  RegistrationSuccess: { type: RegistrationSuccessType };
  LoginEmail: undefined;
  RestoreAccessEmail: { type?: RestoreAccessEmailType };
  ChangePassword: {
    code?: number | undefined;
    type?: ChangePasswordType;
  };
};

const AuthNav = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigation = () => {
  return (
    <AuthNav.Navigator screenOptions={{ headerShown: false }}>
      <AuthNav.Screen name="CheckCode" component={CheckCode} />
      <AuthNav.Screen name="Registration" component={Registration} />
      <AuthNav.Screen name="LoginEmail" component={LoginEmail} />
      <AuthNav.Screen
        name="RegistrationSuccess"
        component={RegistrationSuccess}
      />
      <AuthNav.Screen
        name="RestoreAccessEmail"
        component={RestoreAccessEmail}
      />
      <AuthNav.Screen name="ChangePassword" component={ChangePassword} />
    </AuthNav.Navigator>
  );
};
