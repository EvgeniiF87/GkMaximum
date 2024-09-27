import { notificationProductStock, productFullInfo } from "../config/config";
import {
  IProductFullInfoResponse,
  IResponseProductIsStockNotification,
} from "../../entities/Product/types/product-type";
import { ProductsFavoritesBasketsTags } from "../Products-Favorites-Baskets-Tags/ProductsFavoritesBasketsTags";

export const ProductApi = ProductsFavoritesBasketsTags.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query<IProductFullInfoResponse, number>({
      query: (id) => ({ url: `${productFullInfo}/${id}` }),
      providesTags: ["Favorites"],
    }),
    enableStockNotification: builder.mutation<
      IResponseProductIsStockNotification,
      { item_id: number }
    >({
      query(body) {
        return {
          url: notificationProductStock,
          method: "POST",
          body,
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetProductQuery, useEnableStockNotificationMutation } =
  ProductApi;
