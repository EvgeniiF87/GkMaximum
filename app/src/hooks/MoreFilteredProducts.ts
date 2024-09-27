import { useResultFiltersMutation } from "../../api/FilterApi/FilterApi";
import { IResultFilterRequest } from "../../entities/Filter/types/filter-type";
import {
  setFilteredProduct,
  setPage,
} from "../../store/reducers/FilteredProductSlice";
import { DevelopmentDebug } from "../helpers/development-debug";
import { useAppDispatch, useAppSelector } from "./redux";

export const useMoreFilteredProducts = () => {
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
  const [resultFilters, { isLoading: loading }] = useResultFiltersMutation();
  const { page } = useAppSelector((state) => state.FilteredProductReducer);
  const dispatch = useAppDispatch();

  const moreFilteredProductsHandle = async (searchQuery: string) => {
    const price = filterPrice;
    const payload: IResultFilterRequest = {
      purpose: scale.length ? scale : undefined,
      brand: brands.length ? brands : undefined,
      product_line: appointment.length ? appointment : undefined,
      price: price ? price : undefined,
      region,
      isDiscount: filterSale,
      title: searchQuery ? searchQuery : undefined,
      sorted: sorted.value !== 0 ? sorted.value : undefined,
      our_purpose: offers.value !== 0 ? offers.value : undefined,
      category_id: category_id.length !== 0 ? Number(category_id) : undefined,
      limit: 6,
      page: page + 1,
    };

    resultFilters(payload)
      .unwrap()
      .then((response): void => {
        DevelopmentDebug(response);
        if (response.status === "success") {
          dispatch(setPage(Number(response.data.page)));
          dispatch(setFilteredProduct(response.data.result));
        }
      });
  };

  return { moreFilteredProductsHandle, loading };
};
