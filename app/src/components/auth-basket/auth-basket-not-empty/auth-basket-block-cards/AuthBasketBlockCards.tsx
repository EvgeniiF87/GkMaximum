import { FC, useState, useEffect } from "react";
import { View } from "react-native";
import BlockSelectedAll from "./block-selected-all/BlockSelectedAll";
import BasketProductCard from "./basket-product-card/BasketProductCard";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import {
  setAllSelected,
  setNotAllSelected,
} from "../../../../../store/reducers/BasketSlice";

type AuthBasketBlockCardsProps = {
  showModalHandle: (isFavorites?: boolean, prodyctID?: number) => void;
};

const AuthBasketBlockCards: FC<AuthBasketBlockCardsProps> = ({
  showModalHandle,
}) => {
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectedIDS, setSelectedIDS] = useState<number[]>([]);
  const { products } = useAppSelector((state) => state.basketReducer);

  const dispatch = useAppDispatch();

  const selectAllHandle = () => {
    setSelectAll(!selectAll);
  };

  useEffect(() => {
    if (selectAll) {
      dispatch(setAllSelected());
    } else {
      dispatch(setNotAllSelected());
    }
  }, [selectAll]);

  useEffect(() => {
    const ids: number[] = [];

    products.map((product) => {
      if (product.selected) ids.push(product.id);
    });

    setSelectedIDS(ids);
  }, [products]);

  return (
    <View style={{ marginTop: 30 }}>
      <BlockSelectedAll
        selected={selectAll}
        onPress={selectAllHandle}
        selectedIDS={selectedIDS}
      />
      <View style={{ marginTop: 20 }}>
        {products.map((product) => (
          <BasketProductCard
            key={product.id}
            product={product}
            showModalHandle={showModalHandle}
          />
        ))}
      </View>
    </View>
  );
};

export default AuthBasketBlockCards;
