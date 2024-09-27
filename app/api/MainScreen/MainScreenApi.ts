import {
  mainScreenEndpoint,
  mainScreenAllProductsEndpoint,
} from "../config/config";
import {
  IMainScreenResponse,
  IMainScreenAllProductsResponse,
} from "../../entities/Product/types/product-type";
import { appApi } from "../AppApi/AppApi";

export const MainScreenApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getMainScreenData: builder.query<IMainScreenResponse, string>({
      query: (region) => ({ url: `${mainScreenEndpoint}=${region}` }),
    }),
    getMainScreenAllProducts: builder.query<
      IMainScreenAllProductsResponse,
      { region: string; page?: number; limit?: number }
    >({
      query: ({ region, page = 1, limit = 6 }) => ({
        url: `${mainScreenAllProductsEndpoint}=${region}&limit=${limit}&page=${page}`,
      }),
    }),
  }),
});

export const {
  useLazyGetMainScreenDataQuery,
  useLazyGetMainScreenAllProductsQuery,
} = MainScreenApi;
