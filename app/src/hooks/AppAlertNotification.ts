import { useAppDispatch } from "./redux";
import {
  setIsAlertNotification,
  setAlertNotificationMessage,
  setAlertNotificationType,
  alertNotificationTypeType,
} from "../../store/reducers/AppSlice";

type alertNotificationProps = {
  message?: string | undefined;
  type?: alertNotificationTypeType;
};

const useAppAlertNotification = () => {
  const dispatch = useAppDispatch();
  const alertNotification = (props: alertNotificationProps) => {
    dispatch(setAlertNotificationMessage(props.message));
    dispatch(setIsAlertNotification(true));
    dispatch(setAlertNotificationType(props.type));
  };

  return { alertNotification };
};

export default useAppAlertNotification;
