import {
  IResponseAddFirstProductBasket,
  IResponseDeleteProductBasket,
  IResponseGetAllProductsBasket,
} from "../../entities/Basket/types/basket-types";
import { appApi } from "../AppApi/AppApi";
import {
  addFirstProductBasketEndpoint,
  addOrRemoveProductBasketEndpoint,
  getAllProductsBasketEndpoint,
  deleteProductBasketEndpoint,
} from "../config/config";

export const BasketApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    addFirstProductBasket: builder.mutation<
      IResponseAddFirstProductBasket,
      { item_id: number }
    >({
      query(body) {
        return {
          url: addFirstProductBasketEndpoint,
          method: "POST",
          body,
        };
      },
    }),

    addOrRemoveProductBasket: builder.mutation<
      any,
      { item_id: number; count: number }
    >({
      query(body) {
        return {
          url: addOrRemoveProductBasketEndpoint,
          method: "PUT",
          body,
        };
      },
    }),

    deleteProductBasket: builder.mutation<
      IResponseDeleteProductBasket,
      { item_ids: number[] }
    >({
      query(body) {
        return {
          url: deleteProductBasketEndpoint,
          method: "POST",
          body,
        };
      },
    }),

    getAllProductsBasket: builder.query<
      IResponseGetAllProductsBasket,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 200 }) => ({
        url: `${getAllProductsBasketEndpoint}?limit=${limit}&page=${page}`,
      }),
    }),
  }),
});

export const {
  useAddFirstProductBasketMutation,
  useAddOrRemoveProductBasketMutation,
  useLazyGetAllProductsBasketQuery,
  useDeleteProductBasketMutation,
} = BasketApi;
