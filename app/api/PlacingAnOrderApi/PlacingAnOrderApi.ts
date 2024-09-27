import {
  IPlacingAnOrder,
  IResponsePlacingAnOrder,
} from "../../entities/PlacingOrder/types/placing-order-types";
import { appApi } from "../AppApi/AppApi";
import { placingAnOrderEndpoint } from "../config/config";

export const PlacingAnOrderApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    placingAnOrder: builder.mutation<IResponsePlacingAnOrder, IPlacingAnOrder>({
      query(body) {
        return {
          url: placingAnOrderEndpoint,
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { usePlacingAnOrderMutation } = PlacingAnOrderApi;
