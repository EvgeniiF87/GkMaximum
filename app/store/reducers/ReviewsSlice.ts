import { createSlice } from "@reduxjs/toolkit";
import {
  IReviewsComment,
  IReviewsStatistics,
} from "../../entities/Reviews/types/reviews-types";

interface IReviewsSlice {
  reviewsStatistics: IReviewsStatistics;
  reviews: IReviewsComment[];
  allReviewsCount: number;
  page: number;
  isLoading: boolean;
  sorted: boolean;
}

const initialState: IReviewsSlice = {
  reviewsStatistics: {
    totalCount: 0,
    averageRate: 0.0,
    images: [],
    percentRate: {
      five: 0.0,
      four: 0.0,
      three: 0.0,
      two: 0.0,
      one: 0.0,
    },
  },
  reviews: [],
  allReviewsCount: 0,
  page: 1,
  isLoading: false,
  sorted: false,
};

export const ReviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    setReviewsStatistics(state, action) {
      state.reviewsStatistics = action.payload;
    },
    setReviews(state, action) {
      state.reviews.push(...action.payload);
    },
    setAllReviewsCount(state, action) {
      state.allReviewsCount = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    resetReviews(state) {
      state.reviews = [];
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setSorted(state, action) {
      state.sorted = action.payload;
    },
    resetAllReviews(state) {
      state.reviewsStatistics = {
        totalCount: 0,
        averageRate: 0.0,
        images: [],
        percentRate: {
          five: 0.0,
          four: 0.0,
          three: 0.0,
          two: 0.0,
          one: 0.0,
        },
      };
      state.reviews = [];
      state.allReviewsCount = 0;
      state.page = 1;
      state.isLoading = false;
      state.sorted = false;
    },
  },
});

export const {
  setReviewsStatistics,
  setReviews,
  setAllReviewsCount,
  setPage,
  resetReviews,
  resetAllReviews,
  setIsLoading,
  setSorted,
} = ReviewsSlice.actions;

export default ReviewsSlice.reducer;
