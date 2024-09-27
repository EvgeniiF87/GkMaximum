import { FC, ReactNode, useEffect } from "react";
import { useAppSelector } from "../../hooks/redux";
import { useNavigation } from "@react-navigation/native";
import { AppPropsScreen } from "../../../navigation/routes/app-navigation";
import { useRunApplication } from "../../hooks/RunApplication";

type GeolocationPropsType = {
  children: ReactNode;
};

const GeolocationProvider: FC<GeolocationPropsType> = ({ children }) => {
  const { navigate } = useNavigation<AppPropsScreen>();
  const { showOnbording } = useAppSelector((state) => state.OnbordingReducer);
  const { runApplication } = useRunApplication();

  useEffect(() => {
    if (showOnbording) {
      navigate("Onboarding");
    } else {
      runApplication();
    }
  }, []);

  return <>{children}</>;
};

export default GeolocationProvider;
