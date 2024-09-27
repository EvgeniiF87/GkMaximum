import { FC, useEffect, useState } from "react";
import Header from "../../../src/components/header/Header";
import Layout from "../../../src/components/layout/Layout";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { HomeStackParamList } from "../../../navigation/home/home-navigation";
import { AppPropsScreen } from "../../../navigation/routes/app-navigation";
import {
  useEnableStockNotificationMutation,
  useGetProductQuery,
} from "../../../api/Product/ProductApi";
import ProductFullInfoSceleton from "../../../src/components/product-full-info-sceleton/ProductFullInfoSceleton";
import BlockBottomButtons from "../../../src/components/BlockBottomButtons/BlockBottomButtons";
import Section from "../../../src/components/section/Section";
import { useAppDispatch, useAppSelector } from "../../../src/hooks/redux";
import ProductInfo from "../../../src/components/product-full-info-screen/ProductInfo";
import {
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
} from "../../../api/Favorite/FavoriteApi";
import useAppAlertNotification from "../../../src/hooks/AppAlertNotification";
import { IAddFavoriteErrorResponse } from "../../../entities/Favorite/types/favorite-types";
import { DevelopmentDebug } from "../../../src/helpers/development-debug";
import {
  setAddIsShoppingCart,
  setIsFavorites,
} from "../../../store/reducers/SectionSlice";
import { useAppAlert } from "../../../src/hooks/AppAlert";
import {
  useLazyGetReviewsCommentsQuery,
  useLazyGetReviewsStatisticsQuery,
} from "../../../api/ReviewsApi/ReviewsApi";
import {
  setPage,
  setReviews,
  setAllReviewsCount,
  setReviewsStatistics,
  resetAllReviews,
} from "../../../store/reducers/ReviewsSlice";
import { useAppSpiner } from "../../../src/hooks/AppSpiner";
import {
  useAddFirstProductBasketMutation,
  useAddOrRemoveProductBasketMutation,
} from "../../../api/BasketApi/BasketApi";
import { setAddNewsIsShoppingCart } from "../../../store/reducers/NewsSlice";
import { setAddHitsIsShoppingCart } from "../../../store/reducers/HitSlice";
import { setAddPromotionsIsShoppingCart } from "../../../store/reducers/PromotionsSlice";
import { setAddfFlteredProductIsShoppingCart } from "../../../store/reducers/FilteredProductSlice";
import { setAddCatalogProductIsShoppingCart } from "../../../store/reducers/CatalogProductSlice";
import {
  setAddBasketProduct,
  setBasketProduct,
} from "../../../store/reducers/BasketSlice";

type ProductFullInfoProps = {
  route: RouteProp<HomeStackParamList, "ProductFullInfo">;
};

const ProductFullInfo: FC<ProductFullInfoProps> = ({ route }) => {
  const { goBack, navigate } = useNavigation<AppPropsScreen>();
  const { id, whatComeScreen, searchQuery } = route.params;
  const { alertNotification } = useAppAlertNotification();
  const { showSpiner, hideSpiner } = useAppSpiner();
  const { appAlert } = useAppAlert();
  const { data, isLoading, isSuccess } = useGetProductQuery(id, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const [getReviewsComments, { isLoading: reviewsLoading }] =
    useLazyGetReviewsCommentsQuery();
  const [getReviewsStatistics, { isLoading: statisticsLoading }] =
    useLazyGetReviewsStatisticsQuery();
  const [addFavorite] = useAddFavoriteMutation();
  const [deleteFavorite] = useDeleteFavoriteMutation();
  const dispatch = useAppDispatch();

  const { isAuth } = useAppSelector((state) => state.userReducer);
  const { products } = useAppSelector((state) => state.basketReducer);

  const [enableStockNotification] = useEnableStockNotificationMutation();
  const [addFirstProductBasketMutation] = useAddFirstProductBasketMutation();
  const [addMoreBasket] = useAddOrRemoveProductBasketMutation();

  const [productIsStock, setProductIsStock] = useState<boolean | undefined>(
    false
  );
  const [productIsBasket, setProductIsBasket] = useState<boolean | undefined>(
    false
  );

  const goBackHandle = () => {
    dispatch(resetAllReviews());

    if (whatComeScreen === "search") {
      navigate("Search", { searchQuery });
    } else {
      goBack();
    }
  };

  const inStockHandle = () => {
    if (isAuth) {
      const spinerText = !productIsStock
        ? "Включаем уведомление для данного товара. Подождите..."
        : "Выключаем уведомление для данного товара. Подождите...";
      showSpiner(spinerText);
      enableStockNotification({ item_id: id })
        .unwrap()
        .then((response): void => {
          if (response.status === "success") {
            DevelopmentDebug(response);
            setProductIsStock(!productIsStock);
            hideSpiner();
            alertNotification({
              message: response.data,
              type: "success",
            });
          }
        })
        .catch((err) => DevelopmentDebug(err));
    } else {
      appAlert("notification");
    }
  };

  const addProductBasket = () => {
    if (isAuth) {
      addFirstProductBasketMutation({ item_id: id })
        .unwrap()
        .then((response): void => {
          if (response.status === "success") {
            setProductIsBasket(!productIsBasket);
            dispatch(setAddNewsIsShoppingCart({ id }));
            dispatch(setAddHitsIsShoppingCart({ id }));
            dispatch(setAddPromotionsIsShoppingCart({ id }));
            dispatch(setAddfFlteredProductIsShoppingCart({ id }));
            dispatch(setAddCatalogProductIsShoppingCart({ id }));
            dispatch(setAddIsShoppingCart({ id }));
            dispatch(
              setBasketProduct({ selected: false, ...response.data.data })
            );
            alertNotification({
              message: "Товар добавлен в корзину",
              type: "success",
            });
          }
        })
        .catch((err) => console.log(err));
    } else {
      appAlert("basket");
    }
  };

  const addMoreBasketHandle = () => {
    addMoreBasket({ item_id: id, count: 1 })
      .unwrap()
      .then((response) => {
        dispatch(setAddBasketProduct({ id }));
      })
      .catch((err) => console.log(err));
  };

  const addProductFavorite = () => {
    if (isAuth) {
      addFavorite({ item_id: id })
        .unwrap()
        .then((response): void => {
          DevelopmentDebug(response);
          if (response.status === "success") {
            alertNotification({
              message: response.data,
              type: "success",
            });
            dispatch(setIsFavorites({ id, value: true }));
          }
        })
        .catch((err: IAddFavoriteErrorResponse): void => {
          if (err.data.status === "error") {
            deleteFavorite(id)
              .unwrap()
              .then((response): void => {
                if (response.status === "success") {
                  alertNotification({
                    message: response.data,
                    type: "success",
                  });
                  dispatch(setIsFavorites({ id, value: false }));
                  DevelopmentDebug(response);
                }
              })
              .catch((err) => {
                alertNotification({
                  message: err.data.message,
                  type: "error",
                });
                DevelopmentDebug(err);
              });
          }
        });
    } else {
      appAlert("favorite");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setProductIsStock(data.data.isStock);
      setProductIsBasket(data.data.isShoppingCart === 1 ? true : false);
    }

    products.map((product) => {
      if (product.id === id) {
        setProductIsBasket(true);
      } else {
        setProductIsBasket(false);
      }
    });
  }, [data, isSuccess, products]);

  useEffect(() => {
    dispatch(resetAllReviews());
    getReviewsStatistics({ id })
      .unwrap()
      .then((response): void => {
        if (response.status === "success") {
          dispatch(setReviewsStatistics(response.data));
        }
      })
      .catch((err: any) => {
        DevelopmentDebug({ err });
      });

    getReviewsComments({ item_id: id ?? 0, page: 1 })
      .unwrap()
      .then((response): void => {
        if (response.status === "success") {
          dispatch(setAllReviewsCount(response.data.totalCount));
          dispatch(setPage(Number(response.data.page)));
          dispatch(setReviews(response.data.feedback));
        }
      })
      .catch((err: any) => {
        DevelopmentDebug({ err });
      });
  }, [data]);

  return (
    <Layout
      isNotification
      isBottomButton
      header={
        <Header
          paddingVertical={15}
          showNotificationProductTooltip={
            data?.data?.in_stock === 0 && !productIsStock ? true : false
          }
          leftIcon
          favoritesIcon
          favoritesIconHandle={addProductFavorite}
          addedCurrentProductInFavorite={data?.data.isFavourite}
          notificationIcon={data?.data?.in_stock === 0 ? true : false}
          notificationIconColor={productIsStock ? "#DE002B" : "#898E9F"}
          notificationIconHandle={inStockHandle}
          navigationHandle={goBackHandle}
        />
      }
      bottomButton={
        <BlockBottomButtons
          paddingBottom={35}
          isBasket={productIsBasket}
          isBasketTitle="Добавить еще"
          isBasketHandle={addMoreBasketHandle}
          isInStockNotification={productIsStock}
          isInStock={data?.data?.in_stock === 0 ? true : false}
          inStockHandle={inStockHandle}
          onPressApplayButtonHandle={addProductBasket}
          titleApplayButton="Добавить в корзину"
        />
      }
    >
      {reviewsLoading && statisticsLoading && isLoading ? (
        <ProductFullInfoSceleton />
      ) : (
        <>
          <ProductInfo product={data?.data} screen={"home"} />

          {data && data?.data.recomendation.length > 0 && (
            <Section
              title="Покупают вместе"
              titleFontSize={16}
              titlePaddingHorizontal={20}
              notTouchable
              products={data?.data.recomendation || []}
              _styles={{ marginTop: 10, marginBottom: 60 }}
            />
          )}
        </>
      )}
    </Layout>
  );
};

export default ProductFullInfo;
