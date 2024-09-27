import {
  appAlertComponentType,
  setAppAlertComponent,
  setIsAppAlert,
} from "../../store/reducers/AppSlice";
import { useAppDispatch } from "./redux";

export const useAppAlert = () => {
  const dispatch = useAppDispatch();
  const appAlert = (type: appAlertComponentType) => {
    dispatch(setIsAppAlert(true));
    dispatch(setAppAlertComponent(type));
  };

  return { appAlert };
};
