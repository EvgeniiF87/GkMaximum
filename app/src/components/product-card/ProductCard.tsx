import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { FC, useEffect, useState } from "react";
import { Icon } from "../Icon/Icon";
import { AppIcons } from "../../Icons";
import NewOldPrice from "./new-old-price/NewOldPrice";
import ButtonOutline from "../../ui/ButtonOutline.tsx/ButtonOutline";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IProduct } from "../../../entities/Product/types/product-type";
import { devApiImgUrl } from "../../../api/config/config";
import { useNavigation } from "@react-navigation/native";
import { AppPropsScreen } from "../../../navigation/routes/app-navigation";
import {
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
} from "../../../api/Favorite/FavoriteApi";
import { DevelopmentDebug } from "../../helpers/development-debug";
import useAppAlertNotification from "../../hooks/AppAlertNotification";
import { IAddFavoriteErrorResponse } from "../../../entities/Favorite/types/favorite-types";
import {
  setAddIsShoppingCart,
  setIsFavorites,
} from "../../../store/reducers/SectionSlice";
import {
  setAddPromotionsIsShoppingCart,
  setPromotionsIsFavorites,
} from "../../../store/reducers/PromotionsSlice";
import {
  setAddHitsIsShoppingCart,
  setHitsIsFavorites,
} from "../../../store/reducers/HitSlice";
import {
  setAddNewsIsShoppingCart,
  setNewsIsFavorites,
} from "../../../store/reducers/NewsSlice";
import {
  setAddfFlteredProductIsShoppingCart,
  setfFlteredProductFavorites,
} from "../../../store/reducers/FilteredProductSlice";
import {
  setAddCatalogProductIsShoppingCart,
  setCatalogProductFavorites,
} from "../../../store/reducers/CatalogProductSlice";
import Button from "../../ui/button/Button";
import {
  setBasketProduct,
  setAddBasketProduct,
  setIsFavoritesBasket,
} from "../../../store/reducers/BasketSlice";
import {
  useAddFirstProductBasketMutation,
  useAddOrRemoveProductBasketMutation,
} from "../../../api/BasketApi/BasketApi";
import {
  setAddSearchResultIsShoppingCart,
  setSearchResultIsFavorites,
} from "../../../store/reducers/SearchSlice";

type ProductCardPropsType = {
  product: IProduct;
  whatComeScreen?: "home" | "catalog";
};

const ProductCard: FC<ProductCardPropsType> = ({ product, whatComeScreen }) => {
  const { navigate } = useNavigation<AppPropsScreen>();
  const { id, title, img, price, price_discount, isFavourite, isShoppingCart } =
    product;
  const { isAuth } = useAppSelector((state) => state.userReducer);
  const { alertNotification } = useAppAlertNotification();
  const [addFavorite] = useAddFavoriteMutation();
  const [deleteFavorite] = useDeleteFavoriteMutation();
  const [addFirstProductBasketMutation] = useAddFirstProductBasketMutation();
  const [addMoreBasket] = useAddOrRemoveProductBasketMutation();

  const dispatch = useAppDispatch();

  const productFullInfo = () => {
    if (whatComeScreen === "home") {
      navigate("Main", {
        screen: "Tabs",
        params: {
          screen: "TabHome",
          params: { screen: "ProductFullInfo", params: { id } },
        },
      });
    }

    if (whatComeScreen === "catalog") {
      navigate("Main", {
        screen: "Tabs",
        params: {
          screen: "TabCatalogAndSearch",
          params: { screen: "CatalogProductFullInfo", params: { id } },
        },
      });
    }
  };

  const addAndDeleteFavoriteHandle = () => {
    addFavorite({ item_id: id })
      .unwrap()
      .then((response): void => {
        DevelopmentDebug(response);
        if (response.status === "success") {
          alertNotification({
            message: response.data,
            type: "success",
          });
          dispatch(setIsFavoritesBasket({ id }));
          dispatch(setIsFavorites({ id, value: true }));
          dispatch(setPromotionsIsFavorites({ id, value: true }));
          dispatch(setHitsIsFavorites({ id, value: true }));
          dispatch(setNewsIsFavorites({ id, value: true }));
          dispatch(setfFlteredProductFavorites({ id, value: true }));
          dispatch(setCatalogProductFavorites({ id, value: true }));
          dispatch(setSearchResultIsFavorites({ id, value: true }));
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
                dispatch(setIsFavoritesBasket({ id }));
                dispatch(setIsFavorites({ id, value: false }));
                dispatch(setPromotionsIsFavorites({ id, value: false }));
                dispatch(setHitsIsFavorites({ id, value: false }));
                dispatch(setNewsIsFavorites({ id, value: false }));
                dispatch(setfFlteredProductFavorites({ id, value: false }));
                dispatch(setCatalogProductFavorites({ id, value: false }));
                dispatch(setSearchResultIsFavorites({ id, value: false }));
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
  };

  const addBasketHandle = () => {
    addFirstProductBasketMutation({ item_id: id })
      .unwrap()
      .then((response): void => {
        if (response.status === "success") {
          dispatch(setAddNewsIsShoppingCart({ id }));
          dispatch(setAddHitsIsShoppingCart({ id }));
          dispatch(setAddPromotionsIsShoppingCart({ id }));
          dispatch(setAddfFlteredProductIsShoppingCart({ id }));
          dispatch(setAddCatalogProductIsShoppingCart({ id }));
          dispatch(setAddIsShoppingCart({ id }));
          dispatch(setAddSearchResultIsShoppingCart({ id }));
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
  };

  const addMoreBasketHandle = () => {
    addMoreBasket({ item_id: id, count: 1 })
      .unwrap()
      .then((response) => {
        dispatch(setAddBasketProduct({ id }));
      })
      .catch((err) => console.log(err));
  };

  return (
    <TouchableOpacity style={styles.wrapCard} onPress={productFullInfo}>
      <View style={styles.imgWrap}>
        {isAuth && (
          <TouchableOpacity
            style={styles.favoritesBtn}
            onPress={addAndDeleteFavoriteHandle}
          >
            {isFavourite ? (
              <Icon
                viewBox="22 20"
                size={26}
                path={AppIcons.app.fillFavorites()}
              />
            ) : (
              <Icon
                viewBox="22 20"
                size={26}
                path={AppIcons.tabNavigationIcons.favorites()}
              />
            )}
          </TouchableOpacity>
        )}
        <View style={styles.imgContent}>
          <Image
            source={{ uri: `${devApiImgUrl}/${img}` }}
            style={styles.img}
          />
        </View>
      </View>

      <View style={styles.info}>
        <View
          style={{
            width: "100%",
            maxHeight: 35,
            minHeight: 35,
            overflow: "hidden",
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          <Text
            numberOfLines={2}
            ellipsizeMode={"tail"}
            style={{
              fontSize: 14,
              maxWidth: 160,
              overflow: "hidden",
              textShadowColor: "#000",
              textShadowOffset: { width: 0.01, height: 0.01 },
              textShadowRadius: 0.0001,
            }}
          >
            {title}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 8,
          }}
        >
          {price_discount ? (
            <NewOldPrice oldPrice={price} newPrice={price_discount} />
          ) : (
            <View style={{ height: 22 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "700",
                }}
              >
                {price} ₽
              </Text>
            </View>
          )}
          {isAuth && (
            <View style={{ height: 22 }}>
              {isShoppingCart ? (
                <Button
                  title="ЕЩЁ"
                  type="dark"
                  fontSize={10}
                  paddingVertical={5}
                  paddingHorizontal={12}
                  onPressHandle={addMoreBasketHandle}
                />
              ) : (
                <ButtonOutline
                  title="В КОРЗИНУ"
                  type="dark"
                  fontSize={10}
                  paddingVertical={1}
                  paddingHorizontal={5}
                  onPressHandle={addBasketHandle}
                />
              )}
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
