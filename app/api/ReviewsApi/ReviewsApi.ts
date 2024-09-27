import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  allReviewsCommentsEndpoint,
  devApiUrl,
  reviewsStatisticsEndpoint,
  sortedReviewsCommentsEndpoint,
} from "../config/config";
import {
  IRequestReviewsComments,
  IResponseReviewsComments,
  IResponseReviewsStatistics,
} from "../../entities/Reviews/types/reviews-types";

export const ReviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fetchBaseQuery({ baseUrl: devApiUrl }),
  endpoints: (builder) => ({
    getReviewsStatistics: builder.query<
      IResponseReviewsStatistics,
      { id: number }
    >({
      query: ({ id }) => ({ url: `${reviewsStatisticsEndpoint}=${id}` }),
    }),

    getReviewsComments: builder.query<
      IResponseReviewsComments,
      { item_id: number; limit?: number; page: number }
    >({
      query: ({ item_id, limit = 10, page = 1 }) => ({
        url: `${allReviewsCommentsEndpoint}?item_id=${item_id}&page=${page}&limit=${limit}`,
      }),
    }),

    getSortedReviewsComments: builder.mutation<
      IResponseReviewsComments,
      IRequestReviewsComments
    >({
      query(body) {
        return {
          url: sortedReviewsCommentsEndpoint,
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const {
  useLazyGetReviewsStatisticsQuery,
  useGetSortedReviewsCommentsMutation,
  useLazyGetReviewsCommentsQuery,
} = ReviewsApi;
