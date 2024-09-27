import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Layout from "../../../src/components/layout/Layout";
import Header from "../../../src/components/header/Header";
import Search from "../../../src/components/search/Search";
import { useNavigation } from "@react-navigation/native";
import ProductCardSceleton from "../../../src/components/product-card/card-sceleton/ProductCardSceleton";
import useAppAlertNotification from "../../../src/hooks/AppAlertNotification";
import { useAppDispatch, useAppSelector } from "../../../src/hooks/redux";
import { DevelopmentDebug } from "../../../src/helpers/development-debug";
import ProductCard from "../../../src/components/product-card/ProductCard";
import { setHits, setPage } from "../../../store/reducers/HitSlice";
import { useLazyGetAllHitsQuery } from "../../../api/HitsApi/HitsApi";
import { useAllFiltersCount } from "../../../src/hooks/AllFiltersCount";
import { setOffers } from "../../../store/reducers/FilterSlice";
import { useEffect } from "react";
import { useFilterResult } from "../../../src/hooks/FilterResult";

const Hits = () => {
  const { goBack } = useNavigation();

  const { alertNotification } = useAppAlertNotification();
  const { allFiltersCount } = useAllFiltersCount();
  const { filterResult } = useFilterResult();
  const { filterGoBackScreen } = useAppSelector((state) => state.FilterReducer);
  const { isLoading } = useAppSelector((state) => state.AppReducer);
  const { name } = useAppSelector((state) => state.RegionReducer);
  const { hits, allHitsCount, page } = useAppSelector(
    (state) => state.HitsReducer
  );
  const dispatch = useAppDispatch();
  const [getAllHits, { isLoading: loading }] = useLazyGetAllHitsQuery();

  const goBackHandle = () => {
    dispatch(setOffers({ label: "Без фильтров", value: 0 }));
    goBack();
  };

  const moreProductsHandle = async () => {
    getAllHits({ region: name, page: page + 1 })
      .unwrap()
      .then((AllHits): void => {
        if (AllHits.status === "success") {
          dispatch(setPage(Number(AllHits.data.page)));
          dispatch(setHits(AllHits?.data.byHit));
        }
      })
      .catch((err: any) => {
        DevelopmentDebug({ "Получение хитов": err });
        alertNotification({
          message: "Ошибка получения хитов",
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
      header={<Header title="Хиты" navigationHandle={goBackHandle} leftIcon />}
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
              : hits.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    whatComeScreen={"home"}
                  />
                ))}
            {loading &&
              [...Array(2)].map((_, i) => <ProductCardSceleton key={i} />)}
          </View>

          {allHitsCount !== hits.length && (
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

export default Hits;
