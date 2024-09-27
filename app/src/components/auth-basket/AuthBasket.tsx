import AuthBasketEmpty from "./auth-basket-empty/AuthBasketEmpty";
import AuthBasketNotEmpty from "./auth-basket-not-empty/AuthBasketNotEmpty";
import { useAppSelector } from "../../hooks/redux";

const AuthBasket = () => {
  const { products } = useAppSelector((state) => state.basketReducer);
  return !products?.length ? <AuthBasketEmpty /> : <AuthBasketNotEmpty />;
};

export default AuthBasket;
