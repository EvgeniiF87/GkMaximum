import { FC } from "react";
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { AppIcons } from "../../../../../Icons";
import { Icon } from "../../../../Icon/Icon";
import useAppAlertNotification from "../../../../../hooks/AppAlertNotification";
import { useAppSpiner } from "../../../../../hooks/AppSpiner";
import { useDeleteProductBasketMutation } from "../../../../../../api/BasketApi/BasketApi";
import { useAppDispatch } from "../../../../../hooks/redux";
import { DevelopmentDebug } from "../../../../../helpers/development-debug";
import { setDeleteBasketProduct } from "../../../../../../store/reducers/BasketSlice";
import { setIsShoppingCart } from "../../../../../../store/reducers/SectionSlice";
import { setfFlteredProductIsShoppingCart } from "../../../../../../store/reducers/FilteredProductSlice";
import { setCatalogProductIsShoppingCart } from "../../../../../../store/reducers/CatalogProductSlice";
import { setHitsIsShoppingCart } from "../../../../../../store/reducers/HitSlice";
import { setNewsIsShoppingCart } from "../../../../../../store/reducers/NewsSlice";
import { setPromotionsIsShoppingCart } from "../../../../../../store/reducers/PromotionsSlice";
import { setSearchResultIsShoppingCart } from "../../../../../../store/reducers/SearchSlice";

type BlockSelectedAllProps = {
  selected: boolean;
  selectedIDS: number[];
  onPress: () => void;
};

const BlockSelectedAll: FC<BlockSelectedAllProps> = ({
  selected,
  onPress,
  selectedIDS,
}) => {
  const { alertNotification } = useAppAlertNotification();
  const { showSpiner, hideSpiner } = useAppSpiner();
  const [deleteProductBasket] = useDeleteProductBasketMutation();
  const dispatch = useAppDispatch();

  const deleteSelectedProductsBasketHandle = () => {
    showSpiner("Убираем товар с корзины. Подождите...");
    deleteProductBasket({ item_ids: selectedIDS })
      .unwrap()
      .then((response): void => {
        DevelopmentDebug(response);
        if (response.status === "success") {
          selectedIDS.map((productID) => {
            dispatch(setDeleteBasketProduct(productID));
            dispatch(setIsShoppingCart({ id: productID }));
            dispatch(setfFlteredProductIsShoppingCart({ id: productID }));
            dispatch(setCatalogProductIsShoppingCart({ id: productID }));
            dispatch(setHitsIsShoppingCart({ id: productID }));
            dispatch(setNewsIsShoppingCart({ id: productID }));
            dispatch(setPromotionsIsShoppingCart({ id: productID }));
            dispatch(setSearchResultIsShoppingCart({ id: productID }));
          });
          hideSpiner();
          alertNotification({
            message: "Товар(ы) убраны с корзины",
            type: "success",
          });
        }
      })
      .catch();
  };

  return (
    <View
      style={{
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 6,
              borderWidth: 1,
              borderColor: selected ? "#D71E56" : "#3E3E40",
              backgroundColor: selected ? "#D71E56" : "#fff",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 5,
            }}
          >
            {selected && (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Icon
                  viewBox="50 35"
                  size={12}
                  path={AppIcons.app.checkMark("#fff")}
                />
              </View>
            )}
          </View>
          <Text
            style={{
              color: "#272728",
              fontWeight: "600",
              fontSize: 16,
              lineHeight: 20.8,
            }}
          >
            Выбрать все
          </Text>
        </View>
      </TouchableWithoutFeedback>

      {(selected || selectedIDS.length > 0) && (
        <TouchableOpacity
          onPress={deleteSelectedProductsBasketHandle}
          style={{
            borderColor: "#272728",
            borderBottomWidth: 1,
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontWeight: "400",
              color: "#272728",
              lineHeight: 13,
            }}
          >
            Удалить выбранное
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default BlockSelectedAll;
