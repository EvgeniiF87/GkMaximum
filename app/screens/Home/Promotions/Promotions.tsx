import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Layout from "../../../src/components/layout/Layout";
import Header from "../../../src/components/header/Header";
import Search from "../../../src/components/search/Search";
import { useNavigation } from "@react-navigation/native";
import ProductCardSceleton from "../../../src/components/product-card/card-sceleton/ProductCardSceleton";
import useAppAlertNotification from "../../../src/hooks/AppAlertNotification";
import { useAppDispatch, useAppSelector } from "../../../src/hooks/redux";
import { useLazyGetAllPromotionsQuery } from "../../../api/PromotionsApi/PromotionsApi";
import { DevelopmentDebug } from "../../../src/helpers/development-debug";
import ProductCard from "../../../src/components/product-card/ProductCard";
import {
  setPromotions,
  setPage,
} from "../../../store/reducers/PromotionsSlice";
import { useAllFiltersCount } from "../../../src/hooks/AllFiltersCount";
import { setOffers } from "../../../store/reducers/FilterSlice";
import { useEffect } from "react";
import { useFilterResult } from "../../../src/hooks/FilterResult";

const Promotions = () => {
  const { goBack } = useNavigation();

  const { alertNotification } = useAppAlertNotification();
  const { allFiltersCount } = useAllFiltersCount();
  const { filterResult } = useFilterResult();
  const { filterGoBackScreen } = useAppSelector((state) => state.FilterReducer);
  const { isLoading } = useAppSelector((state) => state.AppReducer);
  const { name } = useAppSelector((state) => state.RegionReducer);
  const { promotions, allPromotionsCount, page } = useAppSelector(
    (state) => state.PromotionsReducer
  );
  const dispatch = useAppDispatch();
  const [getAllPromotions, { isLoading: loading }] =
    useLazyGetAllPromotionsQuery();

  const goBackHandle = () => {
    dispatch(setOffers({ label: "Без фильтров", value: 0 }));
    goBack();
  };

  const moreProductsHandle = async () => {
    getAllPromotions({ region: name, page: page + 1 })
      .unwrap()
      .then((AllPromotions): void => {
        if (AllPromotions.status === "success") {
          dispatch(setPage(Number(AllPromotions.data.page)));
          dispatch(setPromotions(AllPromotions?.data.byDiscount));
        }
      })
      .catch((err: any) => {
        DevelopmentDebug({ "Получение акционных товаров": err });
        alertNotification({
          message: "Ошибка получения акционных товаров",
          type: "error",
        });
      });
  };

  useEffect(() => {
    allFiltersCount();
  }, []);

  useEffect(() => {
    if (filterGoBackScreen) filterResult();
  }, [filterGoBackScreen]);

  return (
    <Layout
      header={<Header title="Акции" navigationHandle={goBackHandle} leftIcon />}
    >
      <View style={{ paddingVertical: 20 }}>
        <ScrollView
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        >
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
              rowGap: 20,
              paddingHorizontal: 10,
              paddingBottom: 20,
            }}
          >
            {isLoading
              ? [...Array(6)].map((_, i) => <ProductCardSceleton key={i} />)
              : promotions.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    whatComeScreen={"home"}
                  />
                ))}
            {loading &&
              [...Array(2)].map((_, i) => <ProductCardSceleton key={i} />)}
          </View>

          {allPromotionsCount !== promotions.length && (
            <View
              style={{
                marginTop: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={moreProductsHandle}
                style={{
                  borderColor: "#272728",
                  borderBottomWidth: 1,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "300",
                    color: "#272728",
                  }}
                >
                  Загрузить ещё
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    </Layout>
  );
};

export default Promotions;
