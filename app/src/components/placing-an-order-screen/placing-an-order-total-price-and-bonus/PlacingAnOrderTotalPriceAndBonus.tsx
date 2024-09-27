import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import SwitchCustom from "expo-custom-switch";
import BlockTextAndDescription from "../../block-text-and-description/BlockTextAndDescription";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setPlacingAnOrderUsedBonus } from "../../../../store/reducers/OrderSlice";

type TotalProductPriceAndCountType = {
  price: number;
  count: number;
  priceD: number | null;
};

const PlacingAnOrderTotalPriceAndBonus = () => {
  const { products } = useAppSelector((state) => state.basketReducer);
  const { user } = useAppSelector((state) => state.userReducer);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [sale, setSale] = useState<number>(0);
  const [totalPay, setTotalPay] = useState<number>(0);
  const [userBonus, setUserBonus] = useState<number>(user.bonus_count ?? 0);
  const [bonus, setBonus] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const totalProductPriceAndCount: TotalProductPriceAndCountType[] = [];

  useEffect(() => {
    let pTotalPrice: number = 0;
    let pSale: number = 0;

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

    if (bonus) {
      dispatch(setPlacingAnOrderUsedBonus(true));
      let bPrice: number = 0;
      bPrice = Math.round(price / 2);
      if (userBonus >= bPrice) {
        setUserBonus((prev) => prev - bPrice);
        setTotalPay(bPrice);
      } else {
        setTotalPay(price - userBonus);
        setUserBonus(0);
      }
    }

    if (!bonus) {
      dispatch(setPlacingAnOrderUsedBonus(false));
      setUserBonus(user.bonus_count ?? 0);
      setTotalPay(pTotalPrice - pSale + 100);
    }
  }, [products, bonus]);

  return (
    <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ width: "80%", rowGap: 6 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                lineHeight: 20.8,
                color: "#272728",
              }}
            >
              Списать бонусы
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                lineHeight: 15.6,
                color: "#272728",
                marginLeft: 6,
              }}
            >
              {"("}
              {userBonus} бонусов{")"}
            </Text>
          </View>

          <Text
            style={{
              fontSize: 12,
              fontWeight: "400",
              lineHeight: 15.6,
              color: "#272728",
            }}
          >
            можно оплатить до 50% стоимости товара бонусами.
          </Text>
        </View>

        <SwitchCustom
          value={bonus}
          onChange={(value) => setBonus(value)}
          rightColor="#DE002B"
          leftColor="#D1D3DE"
          iconRight={{
            color: "#fff",
            style: {
              height: 0,
              width: 0,
            },
          }}
          iconLeft={{
            color: "#fff",
          }}
        />
      </View>

      <View style={{ marginTop: 30 }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            lineHeight: 18.2,
            color: "#272728",
          }}
        >
          Сумма заказа: {totalPrice} ₽
        </Text>
      </View>

      <View style={{ marginTop: 20, rowGap: 20 }}>
        <BlockTextAndDescription text="Стоимость" description={`${price} ₽`} />
        <BlockTextAndDescription text="Доставка" description={`100 ₽`} />

        {sale > 0 && (
          <BlockTextAndDescription
            text="Скидка"
            description={`${sale} ₽`}
            textColor="#DE002B"
            descriptionColor="#DE002B"
          />
        )}

        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            lineHeight: 23.4,
            color: "#272728",
          }}
        >
          Итого к оплате: {totalPay} ₽
        </Text>
      </View>
    </View>
  );
};

export default PlacingAnOrderTotalPriceAndBonus;
