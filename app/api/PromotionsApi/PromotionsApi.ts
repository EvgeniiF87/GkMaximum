import { promotionsEndpoint } from "../config/config";
import { IPromotionsResponse } from "../../entities/Product/types/product-type";
import { appApi } from "../AppApi/AppApi";

export const PromotionsApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPromotions: builder.query<
      IPromotionsResponse,
      { region: string; page?: number; limit?: number }
    >({
      query: ({ region, page = 1, limit = 6 }) => ({
        url: `${promotionsEndpoint}=${region}&limit=${limit}&page=${page}`,
      }),
    }),
  }),
});

export const { useLazyGetAllPromotionsQuery } = PromotionsApi;
