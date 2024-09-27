import { useResultFiltersMutation } from "../../api/FilterApi/FilterApi";
import { IResultFilterRequest } from "../../entities/Filter/types/filter-type";
import {
  setAllCount,
  setFilteredProduct,
  resetFilteredProduct,
} from "../../store/reducers/FilteredProductSlice";
import { setFilterGoBackScreen } from "../../store/reducers/FilterSlice";
import { DevelopmentDebug } from "../helpers/development-debug";
import { useAllFiltersCount } from "./AllFiltersCount";
import { useAppDispatch, useAppSelector } from "./redux";
import { resetSearchResult } from "../../store/reducers/SearchSlice";
import { resetCatalogProduct } from "../../store/reducers/CatalogProductSlice";
import { useState } from "react";

export const useFilterResult = () => {
  const { allFiltersCount } = useAllFiltersCount();
  const [resultFilters, { isLoading: isLoadingFilters }] =
    useResultFiltersMutation();
  const {
    sorted,
    offers,
    price: filterPrice,
    brands,
    appointment,
    scale,
    filterSale,
    category_id,
  } = useAppSelector((state) => state.FilterReducer);
  const { name: region } = useAppSelector((state) => state.RegionReducer);
  const [filter, setFilter] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const filterResult = (searchValue: string) => {
    dispatch(resetFilteredProduct());
    dispatch(resetSearchResult());
    dispatch(resetCatalogProduct());
    allFiltersCount();
    const price = filterPrice;
    const payload: IResultFilterRequest = {
      purpose: scale.length ? scale : undefined,
      brand: brands.length ? brands : undefined,
      product_line: appointment.length ? appointment : undefined,
      price: price ? price : undefined,
      title: searchValue ? searchValue : undefined,
      region,
      isDiscount: filterSale,
      sorted: sorted.value !== 0 ? sorted.value : undefined,
      our_purpose: offers.value !== 0 ? offers.value : undefined,
      category_id: category_id.length !== 0 ? Number(category_id) : undefined,
      limit: 6,
      page: 1,
    };

    resultFilters(payload)
      .unwrap()
      .then((response) => {
        if (response.status === "success") {
          dispatch(setFilterGoBackScreen(false));
          dispatch(setFilteredProduct(response.data.result));
          dispatch(setAllCount(response.data.totalCount));

          if (response.data.result.length) {
            setFilter(false);
          } else {
            setFilter(true);
          }
        }
      })
      .catch((err): void => {
        dispatch(setFilterGoBackScreen(false));
        DevelopmentDebug(err);
      })
      .finally(() => dispatch(setFilterGoBackScreen(false)));
  };

  return { filterResult, isLoadingFilters, filter, setFilter };
};
