import * as Device from "expo-device";
import { useSendLogsMutation } from "../../api/LogsApi/LogsApi";
import { ILogs } from "../../entities/Logs/types/logs-types";
import { useAppSelector } from "./redux";
import PACKAGE from "../../../package.json";

export const useAppLogs = () => {
  const [sendLogsHandle] = useSendLogsMutation();
  const {
    user: { id },
  } = useAppSelector((state) => state.userReducer);

  const userID = id ? String(id) : "Пользователь";

  const authVkSendLogs = (
    context: any,
    type: "success" | "warn" | "error",
    mode: "dev" | "prod"
  ) => {
    const body: ILogs = {
      project_id: "8",
      type,
      mode,
      message: "Авторизация во ВКОНТАКТЕ",
      user_id: userID,
      device_id: Device.modelName ?? "",
      version: PACKAGE.version,
      additional_context: {
        localTime: new Date().toLocaleString(),
        date: new Date(),
        deviceOS: Device.osName ?? "",
        versionOS: Device.osVersion ?? "",
        context: context,
      },
    };

    sendLogsHandle(body);
  };

  return { authVkSendLogs };
};
