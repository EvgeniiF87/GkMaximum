import { IGetRegionBannersResponse } from "../../entities/Banners/types/banners-types";
import { appApi } from "../AppApi/AppApi";
import { bannersEndpoint } from "../config/config";

export const BannersApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getRegionBanners: builder.query<IGetRegionBannersResponse, { id: number }>({
      query: ({ id }) => ({
        url: `${bannersEndpoint}/${id}`,
      }),
    }),
  }),
});

export const { useLazyGetRegionBannersQuery } = BannersApi;
