import Layout from "../../../src/components/layout/Layout";
import Header from "../../../src/components/header/Header";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { FC, useEffect, useState } from "react";
import Search from "../../../src/components/search/Search";
import ResultFilteredCatalogProducts from "../../../src/components/result-filtered-catalog-products/ResultFilteredCatalogProducts";
import { AppPropsScreen } from "../../../navigation/routes/app-navigation";
import { useAppDispatch, useAppSelector } from "../../../src/hooks/redux";
import { resetFilteredProduct } from "../../../store/reducers/FilteredProductSlice";
import { useAllFiltersCount } from "../../../src/hooks/AllFiltersCount";
import { useFilterResult } from "../../../src/hooks/FilterResult";
import ResultSearchProducts from "../../../src/components/result-search-products/ResultSearchProducts";
import { HomeStackParamList } from "../../../navigation/home/home-navigation";
import SearchProductsSceleton from "../../../src/components/search-products-sceleton/SearchProductsSceleton";
import { useLazySearchProductsQuery } from "../../../api/SearchApi/SearchApi";
import {
  resetSearchResult,
  setAllSearchCount,
  setPage,
  setSearchResult,
} from "../../../store/reducers/SearchSlice";
import EmptySearchOrFilteredResult from "../../../src/components/empty-search-or-filtered-result/EmptySearchOrFilteredResult";
import { setResetAllFilters } from "../../../store/reducers/FilterSlice";

type CatalogProductsProps = {
  route: RouteProp<HomeStackParamList, "HomeCatalogProducts">;
};

const HomeCatalogProducts: FC<CatalogProductsProps> = ({ route }) => {
  const { replace } = useNavigation<AppPropsScreen>();
  const { searchQuery } = route.params;
  const { allFiltersCount } = useAllFiltersCount();
  const [isDisableSearch, setIsDisableSearch] = useState<boolean>(true);
  const [search, setSearch] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>(searchQuery ?? "");
  const { id } = useAppSelector((state) => state.RegionReducer);
  const { filterGoBackScreen } = useAppSelector((state) => state.FilterReducer);
  const { searchResult } = useAppSelector((state) => state.SearchReducer);
  const { filteredProduct } = useAppSelector(
    (state) => state.FilteredProductReducer
  );
  const { filterResult, isLoadingFilters, filter, setFilter } =
    useFilterResult();
  const [searchProducts, { isLoading, isFetching }] =
    useLazySearchProductsQuery();
  const dispatch = useAppDispatch();

  const goBackHandle = () => {
    dispatch(resetFilteredProduct());
    dispatch(resetSearchResult());
    dispatch(setResetAllFilters());
    replace("Search", { searchQuery });
  };

  const searchValueHandle = (value: string) => {
    setSearchValue(value);
  };

  const searchProductsHandle = () => {
    dispatch(resetSearchResult());
    dispatch(resetFilteredProduct());
    dispatch(setResetAllFilters());
    searchProducts({ title: searchValue, region_id: id }).then(
      (response): void => {
        if (response.data?.status === "success") {
          dispatch(setSearchResult(response.data.data.items));
          dispatch(setAllSearchCount(response.data.data.totalCount));
          dispatch(setPage(response.data.data.page));

          if (response.data.data.items.length) {
            setSearch(false);
            setFilter(false);
          } else {
            setSearch(true);
            setFilter(false);
          }
        }
      }
    );
  };

  useEffect(() => {
    allFiltersCount();
  }, []);

  useEffect(() => {
    if (searchValue.length === 0) {
      setIsDisableSearch(true);
    } else {
      setIsDisableSearch(false);
    }

    if (filter) {
      setSearch(false);
    }
  }, [searchValue, filter]);

  useEffect(() => {
    if (filterGoBackScreen) filterResult(searchValue);
  }, [filterGoBackScreen]);

  return (
    <Layout
      header={
        <Header title="Каталог" leftIcon navigationHandle={goBackHandle} />
      }
      search={
        <Search
          filter
          value={searchValue}
          onChangeHandle={searchValueHandle}
          searchHandler={searchProductsHandle}
          isDisableSearch={isDisableSearch}
        />
      }
    >
      {isLoading || isFetching || isLoadingFilters ? (
        <SearchProductsSceleton />
      ) : (
        <>
          {filterResult.length > 0 && (
            <ResultFilteredCatalogProducts
              whatComeScreen="home"
              searchQuery={searchValue}
            />
          )}
          {searchResult.length > 0 && (
            <ResultSearchProducts
              searchQuery={searchValue}
              whatComeScreen="home"
            />
          )}
          {search && !searchResult.length && (
            <EmptySearchOrFilteredResult type="search" />
          )}
          {filter && !filteredProduct.length && (
            <EmptySearchOrFilteredResult type="filtered" />
          )}
        </>
      )}
    </Layout>
  );
};

export default HomeCatalogProducts;
