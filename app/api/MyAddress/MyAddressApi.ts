import {
  IAddMyAddressPayload,
  IAddMyAddressResponse,
} from "../../entities/MyAddress/types/my-address-types";
import { appApi } from "../AppApi/AppApi";
import { MyAddressEndpoint } from "../config/config";

export const MyAddressApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    addMyAddress: builder.mutation<IAddMyAddressResponse, IAddMyAddressPayload>(
      {
        query(body) {
          return {
            url: MyAddressEndpoint,
            method: "POST",
            body,
          };
        },
      }
    ),
    selectMainMyAddress: builder.mutation<
      IAddMyAddressResponse,
      { body?: IAddMyAddressPayload; id: number }
    >({
      query({ body, id }) {
        return {
          url: `${MyAddressEndpoint}/isMain/${id}`,
          method: "PUT",
          body,
        };
      },
    }),
    updateMyAddress: builder.mutation<
      IAddMyAddressResponse,
      { body?: IAddMyAddressPayload; id: number }
    >({
      query({ body, id }) {
        return {
          url: `${MyAddressEndpoint}/${id}`,
          method: "PUT",
          body,
        };
      },
    }),
    deleteMyAddress: builder.mutation<IAddMyAddressResponse, { id: number }>({
      query({ id }) {
        return {
          url: `${MyAddressEndpoint}/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useAddMyAddressMutation,
  useSelectMainMyAddressMutation,
  useUpdateMyAddressMutation,
  useDeleteMyAddressMutation,
} = MyAddressApi;
