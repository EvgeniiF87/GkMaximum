import { FC } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Icon } from "../../../Icon/Icon";
import { AppIcons } from "../../../../Icons";
import { useAppDispatch } from "../../../../hooks/redux";
import {
  setDeleteBasketProduct,
  setIsFavoritesBasket,
} from "../../../../../store/reducers/BasketSlice";
import {
  setIsFavorites,
  setIsShoppingCart,
} from "../../../../../store/reducers/SectionSlice";
import {
  setfFlteredProductFavorites,
  setfFlteredProductIsShoppingCart,
} from "../../../../../store/reducers/FilteredProductSlice";
import {
  setCatalogProductFavorites,
  setCatalogProductIsShoppingCart,
} from "../../../../../store/reducers/CatalogProductSlice";
import {
  setHitsIsFavorites,
  setHitsIsShoppingCart,
} from "../../../../../store/reducers/HitSlice";
import {
  setNewsIsFavorites,
  setNewsIsShoppingCart,
} from "../../../../../store/reducers/NewsSlice";
import {
  setPromotionsIsFavorites,
  setPromotionsIsShoppingCart,
} from "../../../../../store/reducers/PromotionsSlice";
import { useDeleteProductBasketMutation } from "../../../../../api/BasketApi/BasketApi";
import { DevelopmentDebug } from "../../../../helpers/development-debug";
import useAppAlertNotification from "../../../../hooks/AppAlertNotification";
import { useAppSpiner } from "../../../../hooks/AppSpiner";
import { useAddFavoriteMutation } from "../../../../../api/Favorite/FavoriteApi";
import { setSearchResultIsShoppingCart } from "../../../../../store/reducers/SearchSlice";

type AuthBasketDeleteProductModalProps = {
  isShow: boolean;
  isFavorites: boolean;
  productID: number;
  hideModalHandle: () => void;
};

const AuthBasketDeleteProductModal: FC<AuthBasketDeleteProductModalProps> = ({
  isShow,
  isFavorites,
  productID,
  hideModalHandle,
}) => {
  const { alertNotification } = useAppAlertNotification();
  const { showSpiner, hideSpiner } = useAppSpiner();
  const [addFavorite] = useAddFavoriteMutation();
  const [deleteProductBasket] = useDeleteProductBasketMutation();
  const dispatch = useAppDispatch();

  const addFavoriteHandle = () => {
    hideModalHandle();
    addFavorite({ item_id: productID })
      .unwrap()
      .then((response): void => {
        if (response.status === "success") {
          alertNotification({
            message: response.data,
            type: "success",
          });
          dispatch(setIsFavoritesBasket({ id: productID }));
          dispatch(setIsFavorites({ id: productID, value: true }));
          dispatch(setPromotionsIsFavorites({ id: productID, value: true }));
          dispatch(setHitsIsFavorites({ id: productID, value: true }));
          dispatch(setNewsIsFavorites({ id: productID, value: true }));
          dispatch(setfFlteredProductFavorites({ id: productID, value: true }));
          dispatch(setCatalogProductFavorites({ id: productID, value: true }));
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteProductBasketHandle = () => {
    hideModalHandle();
    showSpiner("Убираем товар с корзины. Подождите...");
    deleteProductBasket({ item_ids: [productID] })
      .unwrap()
      .then((response): void => {
        DevelopmentDebug(response);
        if (response.status === "success") {
          dispatch(setDeleteBasketProduct(productID));
          dispatch(setIsShoppingCart({ id: productID }));
          dispatch(setfFlteredProductIsShoppingCart({ id: productID }));
          dispatch(setCatalogProductIsShoppingCart({ id: productID }));
          dispatch(setHitsIsShoppingCart({ id: productID }));
          dispatch(setNewsIsShoppingCart({ id: productID }));
          dispatch(setPromotionsIsShoppingCart({ id: productID }));
          dispatch(setSearchResultIsShoppingCart({ id: productID }));
          hideSpiner();
          alertNotification({
            message: "Товар убран с корзины",
            type: "success",
          });
        }
      })
      .catch();
  };

  return (
    <Modal
      animationType={"slide"}
      transparent={true}
      visible={isShow}
      presentationStyle={"overFullScreen"}
    >
      <View
        style={{
          paddingHorizontal: 20,
          width: "100%",
          backgroundColor: "#fff",
          position: "absolute",
          bottom: 0,
          paddingTop: 30,
          paddingBottom: 40,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
      >
        {!isFavorites && (
          <TouchableOpacity onPress={addFavoriteHandle}>
            <View
              style={{
                flexDirection: "row",
                borderColor: "#D1D3DE",
                borderBottomWidth: 1,
                paddingBottom: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "400",
                  lineHeight: 20.8,
                  color: "#272728",
                  marginRight: 10,
                }}
              >
                Перенести в избранное
              </Text>
              <Icon
                viewBox="21 18"
                size={18}
                path={AppIcons.tabNavigationIcons.favorites("#272728")}
              />
            </View>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={deleteProductBasketHandle}
          style={{ paddingTop: isFavorites ? 0 : 20 }}
        >
          <View
            style={{
              flexDirection: "row",
              borderColor: "#D1D3DE",
              borderBottomWidth: 1,
              paddingBottom: 20,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
                lineHeight: 20.8,
                color: "#272728",
              }}
            >
              Удалить
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={hideModalHandle} style={{ paddingTop: 20 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              lineHeight: 20.8,
              color: "#272728",
            }}
          >
            Закрыть
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default AuthBasketDeleteProductModal;
