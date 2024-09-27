import AuthBasket from "../../src/components/auth-basket/AuthBasket";
import NotAuthBasket from "../../src/components/not-auth-basket/NotAuthBasket";
import { useAppSelector } from "../../src/hooks/redux";

const Basket = () => {
  const { isAuth } = useAppSelector((state) => state.userReducer);

  return isAuth ? <AuthBasket /> : <NotAuthBasket />;
};

export default Basket;
