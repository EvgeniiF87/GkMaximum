import {
  IResponseFullInfoOrder,
  IResponseHistoryOrders,
} from "../../entities/history-orders/types/history-orders";
import { appApi } from "../AppApi/AppApi";
import {
  cancelOrderEndpoint,
  historyOrdersEndpoint,
  orderFullInfoEndpoint,
} from "../config/config";

type QueryParamsType = {
  page: number;
  limit: number;
};

export const HistoryOrdersApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllHistoryOrders: builder.query<IResponseHistoryOrders, QueryParamsType>(
      {
        query: ({ page = 1, limit = 200 }) =>
          `${historyOrdersEndpoint}?page=${page}&limit=${limit}`,
      }
    ),
    getFullInfoOrder: builder.query<IResponseFullInfoOrder, { id: number }>({
      query: ({ id }) => `${orderFullInfoEndpoint}/${id}`,
    }),
    cancelOrder: builder.query<IResponseFullInfoOrder, { id: number }>({
      query: ({ id }) => `${cancelOrderEndpoint}/${id}`,
    }),
  }),
});

export const {
  useLazyGetAllHistoryOrdersQuery,
  useGetFullInfoOrderQuery,
  useLazyCancelOrderQuery,
} = HistoryOrdersApi;
