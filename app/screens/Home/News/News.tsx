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
import { setNews, setPage } from "../../../store/reducers/NewsSlice";
import { useLazyGetAllNewsQuery } from "../../../api/NewsApi/NewsApi";
import { setOffers } from "../../../store/reducers/FilterSlice";
import { useAllFiltersCount } from "../../../src/hooks/AllFiltersCount";
import { useEffect } from "react";
import { useFilterResult } from "../../../src/hooks/FilterResult";

const News = () => {
  const { goBack } = useNavigation();

  const { alertNotification } = useAppAlertNotification();
  const { allFiltersCount } = useAllFiltersCount();
  const { isLoading } = useAppSelector((state) => state.AppReducer);
  const { name } = useAppSelector((state) => state.RegionReducer);
  const { filterGoBackScreen } = useAppSelector((state) => state.FilterReducer);
  const { filterResult } = useFilterResult();
  const { news, allNewsCount, page } = useAppSelector(
    (state) => state.NewsReducer
  );
  const dispatch = useAppDispatch();
  const [getAllNews, { isLoading: loading }] = useLazyGetAllNewsQuery();

  const goBackHandle = () => {
    dispatch(setOffers({ label: "Без фильтров", value: 0 }));
    goBack();
  };

  const moreProductsHandle = async () => {
    getAllNews({ region: name, page: page + 1 })
      .unwrap()
      .then((AllNews): void => {
        if (AllNews.status === "success") {
          dispatch(setPage(Number(AllNews.data.page)));
          dispatch(setNews(AllNews?.data.byCreate));
        }
      })
      .catch((err: any) => {
        DevelopmentDebug({ "Получение новинок": err });
        alertNotification({
          message: "Ошибка получения новинок",
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
      header={
        <Header title="Новинки" navigationHandle={goBackHandle} leftIcon />
      }
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
              : news.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    whatComeScreen={"home"}
                  />
                ))}
            {loading &&
              [...Array(2)].map((_, i) => <ProductCardSceleton key={i} />)}
          </View>

          {allNewsCount !== news.length && (
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

export default News;
