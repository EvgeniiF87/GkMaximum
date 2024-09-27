import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Header from "../../../src/components/header/Header";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { AuthStackParamList } from "../../../navigation/auth/auth-navigation";
import { AppPropsScreen } from "../../../navigation/routes/app-navigation";
import { useChangePasswordMutation } from "../../../api/Auth/AuthApi";
import { IResponseError } from "../../../entities/Auth/types/auth-types";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import useAppAlertNotification from "../../../src/hooks/AppAlertNotification";
import { DevelopmentDebug } from "../../../src/helpers/development-debug";
import Layout from "../../../src/components/layout/Layout";
import { useCheckCodeRegistrationOrLogin } from "../../../src/hooks/CheckCodeRegistrationOrLogin";

type CheckCodeProps = {
  route: RouteProp<AuthStackParamList, "CheckCode">;
};

const CELL_COUNT = 4;

const CheckCode: FC<CheckCodeProps> = ({ route }) => {
  const navigation = useNavigation<AppPropsScreen>();
  const { alertNotification } = useAppAlertNotification();
  const { chackCode } = useCheckCodeRegistrationOrLogin();
  const { phone, phoneFormat, email, type } = route?.params;
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [countdown, setCountdown] = useState(false);
  const [seconds, setSeconds] = useState(60);

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [changePassword] = useChangePasswordMutation();
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const countdownInterval = useCallback(() => {
    return setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);
  }, []);

  const requestCodeAgainHandle = () => {
    setSeconds(60);
    setCountdown(true);

    if (
      type === "RestoreAccessEmail" ||
      type === "UserInfo" ||
      type === "registration"
    ) {
      changePassword({ email: email ? email : "" })
        .unwrap()
        .then((data) => {
          if (data.status === "success") {
            alertNotification({
              message: "Мы выслали код. Проверте пожалуйста вашу почту.",
              type: "success",
            });
          }
        })
        .catch((err: IResponseError) => {
          alertNotification({ message: err?.data?.message, type: "error" });
          DevelopmentDebug(err.data);
        })
        .finally(() => {});
    }

    if (type === "login") {
      alertNotification({
        message: "Мы отправили код на ваш номер телефона.",
        type: "success",
      });
    }
  };

  const checkCodeHandle = (): void => {
    chackCode(type, email, phone, value);
  };

  useEffect(() => {
    setCountdown(true);
  }, []);

  useEffect(() => {
    if (type === "RestoreAccessEmail" || type === "UserInfo") {
      setTitle("Восстановить доступ");
    } else if (type === "registration") {
      setTitle("Регистрация");
    } else {
      setTitle("Вход");
    }
  }, []);

  useEffect(() => {
    if (value.length === 4) {
      checkCodeHandle();
    }
  }, [value]);

  useEffect(() => {
    if (countdown) {
      intervalIdRef.current = countdownInterval();
    }
    if (seconds === 0) {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
      setCountdown(false);
    }

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [countdown, seconds]);

  return (
    <Layout
      noMenu
      isNotification
      checkCodeScreen
      header={
        <Header
          title={title}
          navigationHandle={() => navigation.goBack()}
          leftIcon
        />
      }
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          paddingHorizontal: 20,
          marginTop: -180,
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 18,
              color: "#272728",
              fontWeight: "600",
              marginBottom: 10,
            }}
          >
            {phone ? "Подтвердите номер" : "Подтвердите почту"}
          </Text>
          {phone ? (
            <Text style={{ fontSize: 16 }}>{phoneFormat}</Text>
          ) : (
            <Text style={{ fontSize: 16 }}>
              Мы отправили письмо с кодом на почту {email}
            </Text>
          )}
        </View>

        {phone && (
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 18 }}>Введите код из смс</Text>
          </View>
        )}

        <View style={{ marginTop: 30 }}>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <View key={index}>
                <Text
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}
                >
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />
        </View>

        {countdown ? (
          <View style={{ alignItems: "center", marginTop: 40 }}>
            <Text
              style={{
                fontSize:
                  Dimensions.get("window").fontScale === 1
                    ? Dimensions.get("window").fontScale * 18
                    : Dimensions.get("window").fontScale * 24,
                color: "#898E9F",
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              Повторно запросить код возможно через {seconds} сек.
            </Text>
          </View>
        ) : (
          <View style={{ alignItems: "center", marginTop: 40 }}>
            <TouchableOpacity
              style={{ borderBottomColor: "#272728", borderBottomWidth: 1 }}
              onPress={requestCodeAgainHandle}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#272728",
                  fontWeight: "600",
                  paddingBottom: -5,
                }}
              >
                запросить код повторно
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  codeFieldRoot: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  cell: {
    width: 52,
    height: 60,
    lineHeight: 60,
    fontSize: 32,
    borderColor: "#898E9F",
    color: "#898E9F",
    borderWidth: 1,
    borderRadius: 12,
    textAlign: "center",
    textAlignVertical: "center",
  },
  focusCell: {
    borderColor: "#DE002B",
  },
});

export default CheckCode;
