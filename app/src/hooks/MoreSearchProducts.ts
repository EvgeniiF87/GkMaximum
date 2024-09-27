import { useLazySearchProductsQuery } from "../../api/SearchApi/SearchApi";
import { setPage, setSearchResult } from "../../store/reducers/SearchSlice";
import { useAppDispatch, useAppSelector } from "./redux";

export const useMoreSearchProducts = () => {
  const { id } = useAppSelector((state) => state.RegionReducer);
  const { page } = useAppSelector((state) => state.SearchReducer);
  const dispatch = useAppDispatch();

  const [searchProducts, { isLoading: loading, isFetching: fetching }] =
    useLazySearchProductsQuery();

  const moreSearchProductsHandle = async (searchValue: string) => {
    searchProducts({
      title: searchValue,
      region_id: id,
      limit: 6,
      page: page + 1,
    }).then((response) => {
      if (response.data?.status === "success") {
        dispatch(setPage(Number(response.data.data.page)));
        dispatch(setSearchResult(response.data.data.items));
      }
    });
  };

  return { moreSearchProductsHandle, loading, fetching };
};
