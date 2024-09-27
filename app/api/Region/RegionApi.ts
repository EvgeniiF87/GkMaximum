import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { devApiUrl, regionsEndpoint } from "../config/config";
import {
  IAllRegionsResponse,
  IGetRegionResponse,
  IRegionNameGeolocationPayload,
  IRegionNameGeolocationResponse,
} from "../../entities/Region/types/region-type";

export const RegionsApi = createApi({
  reducerPath: "regionsApi",
  baseQuery: fetchBaseQuery({ baseUrl: devApiUrl }),
  endpoints: (builder) => ({
    getRegions: builder.mutation<IAllRegionsResponse, {}>({
      query() {
        return {
          url: regionsEndpoint,
          method: "GET",
        };
      },
    }),
    getRegionNameGeolocation: builder.mutation<
      IRegionNameGeolocationResponse,
      IRegionNameGeolocationPayload
    >({
      query(body) {
        return {
          url: `${regionsEndpoint}/coords`,
          method: "POST",
          body,
        };
      },
    }),
    getRegion: builder.query<IGetRegionResponse, { name: string }>({
      query: ({ name }) => ({
        url: `${regionsEndpoint}/name/${name}`,
      }),
    }),
  }),
});

export const {
  useGetRegionsMutation,
  useGetRegionNameGeolocationMutation,
  useLazyGetRegionQuery,
} = RegionsApi;
