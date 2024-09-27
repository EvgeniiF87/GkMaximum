import { useState, useEffect, FC } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import Header from "../../src/components/header/Header";
import Search from "../../src/components/search/Search";
import Layout from "../../src/components/layout/Layout";
import { useAppDispatch, useAppSelector } from "../../src/hooks/redux";
import { useLazySearchProductsQuery } from "../../api/SearchApi/SearchApi";
import SearchProductCardSceleton from "../../src/components/search-screen/SearchProductCardSceleton";
import {
  setSearchResult,
  setAllSearchCount,
  setPage,
  resetSearchResult,
} from "../../store/reducers/SearchSlice";
import SearchProductCard from "../../src/components/search-screen/SearchProductCard";
import {
  AppPropsScreen,
  AppStackParamList,
} from "../../navigation/routes/app-navigation";
import SearchRecomendationProductCard from "../../src/components/search-screen/SearchRecomendationProductCard";
import EmptySearchResult from "../../src/components/empty-search-or-filtered-result/EmptySearchOrFilteredResult";

type SearchScreenProps = {
  route: RouteProp<AppStackParamList, "Search">;
};

const SearchScreen: FC<SearchScreenProps> = ({ route }) => {
  const { replace } = useNavigation<AppPropsScreen>();
  const searchQuery = route?.params?.searchQuery ?? "";
  const { hits } = useAppSelector((state) => state.SectionReducer);
  const { id } = useAppSelector((state) => state.RegionReducer);
  const [searchValue, setSearchValue] = useState<string>(searchQuery ?? "");
  const [isDisableSearch, setIsDisableSearch] = useState<boolean>(true);
  const [isSearchResult, setIsSearchResult] = useState<boolean>(false);
  const [searchDubleValue, setSearchDubleValue] = useState<string>(
    searchQuery ?? ""
  );
  const [moreProducts, setMoreProducts] = useState<boolean>(false);

  const { searchResult } = useAppSelector((state) => state.SearchReducer);

  const [searchProducts, { isLoading, isFetching }] =
    useLazySearchProductsQuery();
  const dispatch = useAppDispatch();

  const onChangeHandle = (value: string) => {
    setSearchValue(value);
    setTimeout(() => {
      setSearchDubleValue(value);
    }, 1000);
  };

  const goBack = () => {
    setMoreProducts(false);
    setIsSearchResult(false);
    setIsDisableSearch(true);
    dispatch(resetSearchResult());
    replace("Main", {
      screen: "Tabs",
      params: { screen: "TabHome", params: { screen: "Home" } },
    });
  };

  const moreProductsHandle = () => {
    replace("Main", {
      screen: "Tabs",
      params: {
        screen: "TabHome",
        params: {
          screen: "HomeCatalogProducts",
          params: {
            searchQuery: searchValue,
          },
        },
      },
    });
  };

  useEffect(() => {
    if (searchValue === searchDubleValue && searchValue.length > 0) {
      setMoreProducts(false);
      dispatch(resetSearchResult());
      searchProducts({ title: searchValue, region_id: id }).then(
        (response): void => {
          if (response.data?.status === "success") {
            if (
              response.data?.data?.totalCount >
              response.data?.data?.currentCount
            ) {
              setMoreProducts(true);
            } else {
              setMoreProducts(false);
            }
            setIsDisableSearch(false);
            setIsSearchResult(true);
            dispatch(setSearchResult(response.data.data.items));
            dispatch(setAllSearchCount(response.data.data.totalCount));
            dispatch(setPage(response.data.data.page));
          }
        }
      );
    }

    if (searchValue.length === 0) {
      setMoreProducts(false);
      setIsDisableSearch(true);
      setIsSearchResult(false);
      dispatch(resetSearchResult());
    }
  }, [searchValue, searchDubleValue, searchQuery]);

  return (
    <Layout
      header={<Header title="Поиск" navigationHandle={goBack} leftIcon />}
      search={
        <Search
          value={searchValue}
          onChangeHandle={onChangeHandle}
          searchHandler={moreProductsHandle}
          isDisableSearch={isDisableSearch}
        />
      }
    >
      <View style={{ marginTop: 20 }}>
        {isLoading || isFetching ? (
          <SearchProductCardSceleton />
        ) : (
          <>
            {isSearchResult ? (
              searchResult.length ? (
                searchResult.map((product) => (
                  <SearchProductCard
                    key={product.id}
                    product={product}
                    searchQuery={searchValue}
                  />
                ))
              ) : (
                <EmptySearchResult type="search" />
              )
            ) : (
              <View style={{ flex: 1, width: "100%" }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#272728",
                    lineHeight: 18.2,
                    marginBottom: 15,
                    paddingHorizontal: 20,
                  }}
                >
                  Возможно, вас заинтересует
                </Text>
                {hits.slice(0, 6).map((product) => (
                  <SearchRecomendationProductCard
                    key={product.id}
                    product={product}
                    searchQuery={searchValue}
                  />
                ))}
              </View>
            )}

            {moreProducts && (
              <View
                style={{
                  marginTop: 30,
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
                    Посмотреть все
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </View>
    </Layout>
  );
};

export default SearchScreen;
