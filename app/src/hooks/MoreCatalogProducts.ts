import { useLazyGetProductsByCategoryQuery } from "../../api/CategoriesApi/CategoriesApi";
import { IRequestSelectedCategory } from "../../entities/Category/types/category-types";
import { DevelopmentDebug } from "../helpers/development-debug";
import { useAppDispatch, useAppSelector } from "./redux";
import {
  setCatalogProduct,
  setPage,
} from "../../store/reducers/CatalogProductSlice";

export const useMoreCatalogProducts = () => {
  const { name: region } = useAppSelector((state) => state.RegionReducer);
  const { page, selectedCategory } = useAppSelector(
    (state) => state.CatalogProductReducer
  );
  const dispatch = useAppDispatch();

  const [
    getProductsByCategory,
    { isLoading: isLoadingCategory, isFetching: isFetchingCategory },
  ] = useLazyGetProductsByCategoryQuery();

  const moreCatalogProductsHandle = async () => {
    const payload: IRequestSelectedCategory = {
      id: Number(selectedCategory),
      region,
      limit: 6,
      page: page + 1,
    };

    DevelopmentDebug(payload);

    getProductsByCategory(payload)
      .unwrap()
      .then((response): void => {
        DevelopmentDebug(response);
        if (response.status === "success") {
          dispatch(setPage(Number(response.data.page)));
          dispatch(setCatalogProduct(response.data.items));
        }
      });
  };

  return { moreCatalogProductsHandle, isLoadingCategory, isFetchingCategory };
};
