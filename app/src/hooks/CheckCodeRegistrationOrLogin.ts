import { useNavigation } from "@react-navigation/native";
import {
  useVerifyCodeMutation,
  useChangePasswordVerifyMutation,
} from "../../api/Auth/AuthApi";
import { useLazyGetAllProductsBasketQuery } from "../../api/BasketApi/BasketApi";
import { useLazyGetAllDocumentsQuery } from "../../api/DocumentsApi/DocumentsApi";
import { useLazyGetAllHistoryOrdersQuery } from "../../api/HistoryOrdersApi/HistoryOrdersApi";
import {
  useLazyGetMainScreenDataQuery,
  useLazyGetMainScreenAllProductsQuery,
} from "../../api/MainScreen/MainScreenApi";
import { useLazyGetAllPromotionsQuery } from "../../api/PromotionsApi/PromotionsApi";
import { IResponseError } from "../../entities/Auth/types/auth-types";
import {
  setDeleteBasketProducts,
  setAllBasketProduct,
  setCount,
} from "../../store/reducers/BasketSlice";
import { setTermsOfUse } from "../../store/reducers/ConfigurationKeysAndDocumentsSlice";
import {
  setHistoryOrders,
  setAllHistoryOrdersCount,
} from "../../store/reducers/HistoryOrdersSlice";
import {
  resetPromotions,
  setPromotions,
  setAllPromotionsCount,
} from "../../store/reducers/PromotionsSlice";
import { setCityName } from "../../store/reducers/RegionSlice";
import { setPage } from "../../store/reducers/SearchSlice";
import {
  setNews,
  setHits,
  setSales,
  setAllProductsReset,
  setAllProductsCount,
  setAllProducts,
} from "../../store/reducers/SectionSlice";
import {
  setIsAuth,
  setAccessToken,
  setRefreshToken,
  setUser,
} from "../../store/reducers/UserSlice";
import { DevelopmentDebug } from "../helpers/development-debug";
import useAppAlertNotification from "./AppAlertNotification";
import { useAppSpiner } from "./AppSpiner";
import { useAppDispatch, useAppSelector } from "./redux";
import { AppPropsScreen } from "../../navigation/routes/app-navigation";

type CheckCodeType =
  | "login"
  | "registration"
  | "RestoreAccessEmail"
  | "UserInfo";

export const useCheckCodeRegistrationOrLogin = () => {
  const navigation = useNavigation<AppPropsScreen>();
  const { alertNotification } = useAppAlertNotification();
  const { showSpiner, hideSpiner } = useAppSpiner();
  const { name: regionName } = useAppSelector((state) => state.RegionReducer);
  const { devicePushToken } = useAppSelector((state) => state.AppReducer);

  const [verifyCode] = useVerifyCodeMutation();
  const [changePasswordVerify] = useChangePasswordVerifyMutation();
  const [getSectionsData] = useLazyGetMainScreenDataQuery();
  const [getAllProducts] = useLazyGetMainScreenAllProductsQuery();
  const [getAllPromotions] = useLazyGetAllPromotionsQuery();
  const [getAllUserHistoryOrders] = useLazyGetAllHistoryOrdersQuery();
  const [getAllProductsBasket] = useLazyGetAllProductsBasketQuery();
  const [getAllDocuments] = useLazyGetAllDocumentsQuery();

  const dispatch = useAppDispatch();

  const titleSpiner = "Идёт проверка кода. Подождите...";

  const chackCode = (
    type: CheckCodeType,
    email: string | undefined,
    phone: string | undefined,
    value: string
  ) => {
    if (type === "login") {
      showSpiner(titleSpiner);
      dispatch(setDeleteBasketProducts());
      verifyCode({
        email,
        phone,
        code: Number(value),
        firebase_id: devicePushToken.length > 0 ? devicePushToken : undefined,
      })
        .unwrap()
        .then((data): void => {
          if (data?.status === "success") {
            alertNotification({
              message: "Успешная авторизация",
              type: "success",
            });
            dispatch(setIsAuth(true));
            dispatch(setAccessToken(data.data.tokens.accessToken));
            dispatch(setRefreshToken(data.data.tokens.refreshToken));
            dispatch(setUser(data.data.user));

            dispatch(setNews([]));
            dispatch(setHits([]));
            dispatch(setSales([]));
            dispatch(setAllProductsReset());
            dispatch(setAllProductsCount(0));
            dispatch(setPage(1));
            dispatch(resetPromotions());

            const region = data.data.user.city
              ? data.data.user.city
              : regionName;

            const promotions = getAllPromotions({ region })
              .unwrap()
              .then((AllPromotions) => {
                if (AllPromotions.status === "success") {
                  dispatch(setPromotions(AllPromotions?.data.byDiscount));
                  dispatch(
                    setAllPromotionsCount(AllPromotions?.data.totalCount)
                  );
                  return true;
                }
              })
              .catch((err: any) => DevelopmentDebug(err));

            const section = getSectionsData(region)
              .unwrap()
              .then((sectionData) => {
                if (sectionData.status === "success") {
                  dispatch(setNews(sectionData?.data.byCreate));
                  dispatch(setHits(sectionData?.data.byHit));
                  dispatch(setSales(sectionData?.data.byDiscount));
                  return true;
                }
              })
              .catch((err) => console.log(err));

            const products = getAllProducts({ region })
              .unwrap()
              .then((allProductsData) => {
                if (allProductsData.status === "success") {
                  dispatch(setAllProducts(allProductsData?.data.items));
                  dispatch(
                    setAllProductsCount(allProductsData.data.totalCount)
                  );
                  return true;
                }
              })
              .catch((err) => console.log(err));

            const userHistoryOrders = getAllUserHistoryOrders({
              page: 1,
              limit: 200,
            })
              .unwrap()
              .then((allHistoryOrders) => {
                if (allHistoryOrders.status === "success") {
                  dispatch(setHistoryOrders(allHistoryOrders.data.orders));
                  dispatch(
                    setAllHistoryOrdersCount(allHistoryOrders.data.totalCount)
                  );
                  return true;
                }
              })
              .catch((err) => console.log(err));

            const allProductsBasket = getAllProductsBasket({})
              .unwrap()
              .then((response) => {
                response.data.items.map((product) => {
                  dispatch(
                    setAllBasketProduct({ ...product, selected: false })
                  );
                  dispatch(setCount(product.count));
                });
                return true;
              })
              .catch((err) => DevelopmentDebug(err));

            const documents = getAllDocuments({})
              .unwrap()
              .then((response) => {
                if (response.status === "success") {
                  response.data.documents.map((document) => {
                    if (document.key === "Пользовательское соглашение") {
                      dispatch(setTermsOfUse(document));
                    }
                  });
                  return true;
                }
              })
              .catch((err) => DevelopmentDebug(err));

            Promise.all([
              section,
              products,
              promotions,
              userHistoryOrders,
              allProductsBasket,
              documents,
            ]).then((response) => {
              if (
                response[0] &&
                response[1] &&
                response[2] &&
                response[3] &&
                response[4] &&
                response[5]
              ) {
                dispatch(setCityName(region));
                hideSpiner();
                navigation.navigate("Main", {
                  screen: "Tabs",
                  params: { screen: "TabHome", params: { screen: "Home" } },
                });
              }
            });
          }
        })
        .catch((err: IResponseError) => {
          hideSpiner();
          alertNotification({
            message: err.data?.message,
            type: "error",
          });
          DevelopmentDebug(err.data);
        });
    }

    if (type === "registration") {
      showSpiner(titleSpiner);
      verifyCode({
        email,
        phone,
        code: Number(value),
        firebase_id: devicePushToken.length > 0 ? devicePushToken : undefined,
      })
        .unwrap()
        .then((data) => {
          if (data?.status === "success") {
            alertNotification({
              message: "Успешная авторизация",
              type: "success",
            });
            dispatch(setAccessToken(data.data.tokens.accessToken));
            dispatch(setRefreshToken(data.data.tokens.refreshToken));
            dispatch(setIsAuth(true));
            dispatch(setUser(data.data.user));
            hideSpiner();
            navigation.navigate("Auth", {
              screen: "RegistrationSuccess",
              params: { type: "registration" },
            });
          }
        })
        .catch((err: IResponseError) => {
          hideSpiner();
          alertNotification({
            message: err.data?.message,
            type: "error",
          });
          DevelopmentDebug(err.data);
        });
    }

    if (type === "RestoreAccessEmail") {
      showSpiner(titleSpiner);
      changePasswordVerify({ email, code: Number(value) })
        .unwrap()
        .then((data) => {
          if (data.status === "success") {
            hideSpiner();
            navigation.navigate("Auth", {
              screen: "ChangePassword",
              params: { code: Number(value) },
            });
          }
        })
        .catch((err: IResponseError): void => {
          hideSpiner();
          alertNotification({
            message: err.data?.message,
            type: "error",
          });
          DevelopmentDebug(err);
        });
    }

    if (type === "UserInfo") {
      showSpiner(titleSpiner);
      changePasswordVerify({ email, code: Number(value) })
        .unwrap()
        .then((data) => {
          if (data.status === "success") {
            hideSpiner();
            navigation.navigate("Auth", {
              screen: "ChangePassword",
              params: { code: Number(value), type: "UserInfoRestoreAccess" },
            });
          }
        })
        .catch((err: IResponseError): void => {
          hideSpiner();
          alertNotification({
            message: err.data?.message,
            type: "error",
          });
          DevelopmentDebug(err);
        });
    }
  };

  return { chackCode };
};
