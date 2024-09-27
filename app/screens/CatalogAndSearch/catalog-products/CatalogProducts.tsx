import Layout from "../../../src/components/layout/Layout";
import Header from "../../../src/components/header/Header";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { CatalogAndSearchStackParamList } from "../../../navigation/catalog-and-search/catalog-and-search-navigation";
import { FC, useEffect, useState } from "react";
import Search from "../../../src/components/search/Search";
import ResultFilteredCatalogProducts from "../../../src/components/result-filtered-catalog-products/ResultFilteredCatalogProducts";
import ResultSelectedCategoryProducts from "../../../src/components/result-selected-category-products/ResultSelectedCategoryProducts";
import { AppPropsScreen } from "../../../navigation/routes/app-navigation";
import { useAppDispatch, useAppSelector } from "../../../src/hooks/redux";
import { resetCatalogProduct } from "../../../store/reducers/CatalogProductSlice";
import { resetFilteredProduct } from "../../../store/reducers/FilteredProductSlice";
import { useAllFiltersCount } from "../../../src/hooks/AllFiltersCount";
import { useFilterResult } from "../../../src/hooks/FilterResult";
import {
  setFilterTitle,
  setResetAllFilters,
} from "../../../store/reducers/FilterSlice";
import { useLazySearchProductsQuery } from "../../../api/SearchApi/SearchApi";
import {
  resetSearchResult,
  setAllSearchCount,
  setPage,
  setSearchResult,
} from "../../../store/reducers/SearchSlice";
import SearchProductsSceleton from "../../../src/components/search-products-sceleton/SearchProductsSceleton";
import ResultSearchProducts from "../../../src/components/result-search-products/ResultSearchProducts";
import EmptySearchOrFilteredResult from "../../../src/components/empty-search-or-filtered-result/EmptySearchOrFilteredResult";

type CatalogProductsProps = {
  route: RouteProp<CatalogAndSearchStackParamList, "CatalogProducts">;
};

const CatalogProducts: FC<CatalogProductsProps> = ({ route }) => {
  const { goBack } = useNavigation<AppPropsScreen>();
  const { categoryTitle } = route.params;
  const { allFiltersCount } = useAllFiltersCount();
  const [headerTitle, setHeaderTitle] = useState<string | undefined>("");
  const [isDisableSearch, setIsDisableSearch] = useState<boolean>(true);
  const [search, setSearch] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const { id } = useAppSelector((state) => state.RegionReducer);
  const { filterGoBackScreen } = useAppSelector((state) => state.FilterReducer);
  const { filteredProduct } = useAppSelector(
    (state) => state.FilteredProductReducer
  );
  const { searchResult } = useAppSelector((state) => state.SearchReducer);
  const { catalogProduct } = useAppSelector(
    (state) => state.CatalogProductReducer
  );
  const { filterResult, isLoadingFilters, filter, setFilter } =
    useFilterResult();
  const [searchProducts, { isLoading, isFetching }] =
    useLazySearchProductsQuery();
  const dispatch = useAppDispatch();

  const goBackHandle = () => {
    dispatch(resetCatalogProduct());
    dispatch(resetFilteredProduct());
    dispatch(setResetAllFilters());
    dispatch(resetSearchResult());
    dispatch(resetFilteredProduct());
    goBack();
  };

  const searchProductsHandle = () => {
    dispatch(resetSearchResult());
    dispatch(resetFilteredProduct());
    dispatch(setResetAllFilters());
    dispatch(resetCatalogProduct());
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

  const searchValueHandle = (value: string) => {
    setSearchValue(value);
    dispatch(setFilterTitle(value));
  };

  useEffect(() => {
    allFiltersCount();
  }, []);

  useEffect(() => {
    setHeaderTitle(categoryTitle);
    if (searchValue.length === 0) {
      setIsDisableSearch(true);
    } else {
      setIsDisableSearch(false);
    }

    if (filter) {
      setSearch(false);
    }
  }, [categoryTitle, searchValue, filter]);

  useEffect(() => {
    if (filterGoBackScreen) filterResult(searchValue);
  }, [filterGoBackScreen]);

  return (
    <Layout
      header={
        <Header title={headerTitle} leftIcon navigationHandle={goBackHandle} />
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
          {catalogProduct.length > 0 && <ResultSelectedCategoryProducts />}
          {filterResult.length > 0 && (
            <ResultFilteredCatalogProducts
              whatComeScreen="catalog"
              searchQuery={searchValue}
            />
          )}
          {searchResult.length > 0 && (
            <ResultSearchProducts
              searchQuery={searchValue}
              whatComeScreen="catalog"
            />
          )}
          {filter && !filteredProduct.length && (
            <EmptySearchOrFilteredResult type="filtered" />
          )}
          {search && !searchResult.length && (
            <EmptySearchOrFilteredResult type="search" />
          )}
        </>
      )}
    </Layout>
  );
};

export default CatalogProducts;
