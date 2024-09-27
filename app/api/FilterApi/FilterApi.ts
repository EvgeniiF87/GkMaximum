import { allFiltersEndpoint, resultFilterEndpoint } from "../config/config";
import { appApi } from "../AppApi/AppApi";
import {
  IAllFilters,
  IResultFilterRequest,
  IResultFilterResponse,
} from "../../entities/Filter/types/filter-type";

export const FilterApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFilters: builder.query<IAllFilters, any>({
      query: () => ({ url: allFiltersEndpoint }),
    }),
    resultFilters: builder.mutation<
      IResultFilterResponse,
      IResultFilterRequest
    >({
      query(body) {
        return {
          url: resultFilterEndpoint,
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useGetAllFiltersQuery, useResultFiltersMutation } = FilterApi;
