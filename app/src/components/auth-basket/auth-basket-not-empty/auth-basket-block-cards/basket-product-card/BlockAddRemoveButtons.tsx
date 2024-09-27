import { FC } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "../../../../Icon/Icon";
import { AppIcons } from "../../../../../Icons";
import {
  useAddOrRemoveProductBasketMutation,
  useDeleteProductBasketMutation,
} from "../../../../../../api/BasketApi/BasketApi";
import { useAppDispatch } from "../../../../../hooks/redux";
import {
  setAddBasketProduct,
  setDeleteBasketProduct,
  setRemoveBasketProduct,
} from "../../../../../../store/reducers/BasketSlice";
import useAppAlertNotification from "../../../../../hooks/AppAlertNotification";
import { useAppSpiner } from "../../../../../hooks/AppSpiner";
import { setIsShoppingCart } from "../../../../../../store/reducers/SectionSlice";
import { setfFlteredProductIsShoppingCart } from "../../../../../../store/reducers/FilteredProductSlice";
import { setCatalogProductIsShoppingCart } from "../../../../../../store/reducers/CatalogProductSlice";
import { setHitsIsShoppingCart } from "../../../../../../store/reducers/HitSlice";
import { setNewsIsShoppingCart } from "../../../../../../store/reducers/NewsSlice";
import { setPromotionsIsShoppingCart } from "../../../../../../store/reducers/PromotionsSlice";
import { setSearchResultIsShoppingCart } from "../../../../../../store/reducers/SearchSlice";

type BlockAddRemoveButtonsProps = {
  count: number;
  id: number;
  inStock: number;
};

const BlockAddRemoveButtons: FC<BlockAddRemoveButtonsProps> = ({
  count,
  id,
  inStock,
}) => {
  const { alertNotification } = useAppAlertNotification();
  const { showSpiner, hideSpiner } = useAppSpiner();
  const [addOneProductBasket] = useAddOrRemoveProductBasketMutation();
  const [deleteProductBasket] = useDeleteProductBasketMutation();
  const dispatch = useAppDispatch();

  const addMoreBasketHandle = () => {
    addOneProductBasket({ item_id: id, count: 1 })
      .unwrap()
      .then((response) => {
        dispatch(setAddBasketProduct({ id }));
      })
      .catch((err) => console.log(err));
  };

  const removeMoreBasketHandle = () => {
    if (count > 1) {
      addOneProductBasket({ item_id: id, count: -1 })
        .unwrap()
        .then((response) => {
          dispatch(setRemoveBasketProduct({ id }));
        })
        .catch((err) => console.log(err));
    } else {
      showSpiner("Убираем товар с корзины. Подождите...");
      deleteProductBasket({ item_ids: [id] })
        .unwrap()
        .then((response): void => {
          if (response.status === "success") {
            dispatch(setDeleteBasketProduct(id));
            dispatch(setIsShoppingCart({ id }));
            dispatch(setfFlteredProductIsShoppingCart({ id }));
            dispatch(setCatalogProductIsShoppingCart({ id }));
            dispatch(setHitsIsShoppingCart({ id }));
            dispatch(setNewsIsShoppingCart({ id }));
            dispatch(setPromotionsIsShoppingCart({ id }));
            dispatch(setSearchResultIsShoppingCart({ id }));
            hideSpiner();
            alertNotification({
              message: "Товар убран с корзины",
              type: "success",
            });
          }
        })
        .catch();
    }
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text
        style={{
          color: inStock === 1 ? "#272728" : "#D1D3DE",
          fontSize: 12,
          fontWeight: "400",
          lineHeight: 15.6,
        }}
      >
        Количество:
      </Text>

      <View
        style={{
          flexDirection: "row",
          columnGap: 15,
          alignItems: "center",
          marginLeft: 10,
        }}
      >
        <TouchableOpacity
          disabled={inStock === 1 ? false : true}
          onPress={addMoreBasketHandle}
        >
          <View
            style={{
              padding: 5,
              shadowColor: "#272728",
              shadowOpacity: 0.2,
              shadowOffset: { width: 0, height: 0 },
              shadowRadius: 4,
              borderRadius: 50,
              backgroundColor: "#fff",
            }}
          >
            <Icon
              viewBox="26 26"
              size={12}
              path={AppIcons.app.plus(inStock === 1 ? "#272728" : "#D1D3DE")}
            />
          </View>
        </TouchableOpacity>
        <Text
          style={{
            color: inStock === 1 ? "#272728" : "#D1D3DE",
            fontSize: 14,
            fontWeight: "600",
            lineHeight: 18.2,
          }}
        >
          {count}
        </Text>
        <TouchableOpacity
          onPress={removeMoreBasketHandle}
          disabled={inStock === 1 ? false : true}
        >
          <View
            style={{
              padding: 5,
              shadowColor: "#272728",
              shadowOpacity: 0.2,
              shadowOffset: { width: 0, height: 0 },
              shadowRadius: 4,
              borderRadius: 50,
              backgroundColor: "#fff",
            }}
          >
            <Icon
              viewBox="14 2"
              size={12}
              path={AppIcons.app.minus(inStock === 1 ? "#272728" : "#D1D3DE")}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BlockAddRemoveButtons;
