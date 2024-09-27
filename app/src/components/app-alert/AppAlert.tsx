import { FC, ReactNode } from "react";
import { useAppSelector } from "../../hooks/redux";
import { appAlertComponentType } from "../../../store/reducers/AppSlice";
import NotAuthProduct from "./not-auth-alert/NotAuthProduct";
import DeleteAdress from "./delete-adress/DeleteAdress";
import DeleteAccount from "./delete-account/DeleteAccount";

type ProductNotAuthAlertProviderProps = {
  children: ReactNode;
};

type AlertComponentProps = {
  type: appAlertComponentType;
};

const AlertComponent: FC<AlertComponentProps> = ({ type }) => {
  switch (type) {
    case "notification":
      return <NotAuthProduct type={type} />;
    case "basket":
      return <NotAuthProduct type={type} />;
    case "favorite":
      return <NotAuthProduct type={type} />;
    case "deleteAdress":
      return <DeleteAdress />;
    case "deleteAccount":
      return <DeleteAccount />;
  }
};

const ApplertProvider: FC<ProductNotAuthAlertProviderProps> = ({
  children,
}) => {
  const { isAppAlert, appAlertComponent } = useAppSelector(
    (state) => state.AppReducer
  );

  return (
    <>
      {isAppAlert && <AlertComponent type={appAlertComponent} />}
      {children}
    </>
  );
};

export default ApplertProvider;
