import { newsEndpoint } from "../config/config";
import { INewsResponse } from "../../entities/Product/types/product-type";
import { appApi } from "../AppApi/AppApi";

export const NewsApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNews: builder.query<
      INewsResponse,
      { region: string; page?: number; limit?: number }
    >({
      query: ({ region, page = 1, limit = 6 }) => ({
        url: `${newsEndpoint}=${region}&limit=${limit}&page=${page}`,
      }),
    }),
  }),
});

export const { useLazyGetAllNewsQuery } = NewsApi;
