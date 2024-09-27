import { hitsEndpoint } from "../config/config";
import { IHitsResponse } from "../../entities/Product/types/product-type";
import { appApi } from "../AppApi/AppApi";

export const HitsApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllHits: builder.query<
      IHitsResponse,
      { region: string; page?: number; limit?: number }
    >({
      query: ({ region, page = 1, limit = 6 }) => ({
        url: `${hitsEndpoint}=${region}&limit=${limit}&page=${page}`,
      }),
    }),
  }),
});

export const { useLazyGetAllHitsQuery } = HitsApi;
