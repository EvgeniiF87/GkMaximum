import {
  IResponseConfigurationKey,
  IResponseConfigurationKeys,
} from "../../entities/ConfigurationKeys/types/configuration-keys-types";
import { appApi } from "../AppApi/AppApi";
import { configurationKeysEndpoint } from "../config/config";

export const ConfigurationKeysApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getConfigurationKey: builder.query<
      IResponseConfigurationKey,
      { key: string }
    >({
      query: ({ key }) => ({
        url: `${configurationKeysEndpoint}/key/${key}`,
      }),
    }),
    getAllConfigurationKeys: builder.query<IResponseConfigurationKeys, {}>({
      query: () => ({
        url: `${configurationKeysEndpoint}?page=1&limit=100`,
      }),
    }),
  }),
});

export const {
  useGetConfigurationKeyQuery,
  useLazyGetAllConfigurationKeysQuery,
} = ConfigurationKeysApi;
