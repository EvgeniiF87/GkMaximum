import { FC, useState, useEffect } from "react";
import { View } from "react-native";
import { useAppSelector } from "../../../../hooks/redux";
import BlockTotalPriceAndSale from "./block-total-price-and-sale/BlockTotalPriceAndSale";
import BlockToPay from "./block-to-pay/BlockToPay";
import BlockOrderBonus from "./block-order-bonus/BlockOrderBonus";
import { useGetConfigurationKeyQuery } from "../../../../../api/ConfigurationKeysApi/ConfigurationKeysApi";

type TotalProductPriceAndCountType = {
  price: number;
  count: number;
  priceD: number | null;
};

const AuthBasketBlockOrderPrice = () => {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [sale, setSale] = useState<number>(0);
  const [totalPay, setTotalPay] = useState<number>(0);
  const [bonus, setBonus] = useState<number>(0);

  const { products } = useAppSelector((state) => state.basketReducer);
  const { data, refetch, status } = useGetConfigurationKeyQuery({
    key: "percentOfBonusAccrual",
  });

  const totalProductPriceAndCount: TotalProductPriceAndCountType[] = [];
  let actualProcentBonus = data?.data.configurationKey.key;

  useEffect(() => {
    let pTotalPrice: number = 0;
    let pSale: number = 0;
    refetch();

    products.map((product): void => {
      if (product.in_stock === 1) {
        totalProductPriceAndCount.push({
          price: product.price ?? 0,
          count: product.count,
          priceD: product.price_discount ?? null,
        });
      }
    });

    totalProductPriceAndCount.map(({ price, priceD, count }) => {
      if (priceD) {
        pTotalPrice += price * count;
        pSale += price * count - priceD * count;
      } else {
        pTotalPrice += price * count;
      }
    });

    setTotalPrice(pTotalPrice);
    setPrice(pTotalPrice - pSale);
    setTotalPay(pTotalPrice - pSale);
    setSale(pSale);
    if (status === "fulfilled")
      setBonus(((pTotalPrice - pSale) / 100) * Number(actualProcentBonus));
    if (totalProductPriceAndCount.length === 0) setBonus(0);
  }, [products, data]);

  return (
    <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
      <BlockTotalPriceAndSale
        totalPrice={totalPrice}
        price={price}
        sale={sale}
        totalPay={totalPay}
      />

      <BlockToPay price={price} sale={sale} totalPrice={totalPrice} />

      <BlockOrderBonus bonus={bonus} />
    </View>
  );
};

export default AuthBasketBlockOrderPrice;
