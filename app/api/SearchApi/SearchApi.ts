import {
  IRequestSearch,
  IResponseSearch,
} from "../../entities/Search/types/search-types";
import { appApi } from "../AppApi/AppApi";
import { searchEndpoint } from "../config/config";

export const SearchApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    searchProducts: builder.query<IResponseSearch, IRequestSearch>({
      query: ({ title, region_id, page = 1, limit = 6 }) =>
        `${searchEndpoint}?title=${title}&region_id=${region_id}&page=${page}&limit=${limit}`,
    }),
  }),
});

export const { useLazySearchProductsQuery } = SearchApi;
