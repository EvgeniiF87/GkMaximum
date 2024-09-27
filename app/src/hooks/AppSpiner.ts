import {
  setIsSpiner,
  setTitleSpiner,
  resetSpiner,
} from "../../store/reducers/AppSlice";
import { useAppDispatch } from "./redux";

export const useAppSpiner = () => {
  const dispatch = useAppDispatch();

  const showSpiner = (title: string) => {
    dispatch(setIsSpiner(true));
    dispatch(setTitleSpiner(title));
  };

  const hideSpiner = () => {
    dispatch(resetSpiner());
  };

  return { showSpiner, hideSpiner };
};
