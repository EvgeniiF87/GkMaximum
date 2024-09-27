import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../entities/Product/types/product-type";

interface INewsSlice {
  news: IProduct[];
  allNewsCount: number;
  page: number;
}

const initialState: INewsSlice = {
  news: [],
  allNewsCount: 0,
  page: 1,
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNewsIsFavorites(
      state,
      action: PayloadAction<{ id: number; value: boolean }>
    ) {
      state.news.map((item) => {
        if (item.id === action.payload.id) {
          item.isFavourite = action.payload.value;
        }
        return item;
      });
    },
    setNewsIsShoppingCart(state, action: PayloadAction<{ id: number }>) {
      state.news.map((item) => {
        if (item.id === action.payload.id) {
          item.isShoppingCart = 0;
        }
        return item;
      });
    },
    setAddNewsIsShoppingCart(state, action: PayloadAction<{ id: number }>) {
      if (state.news.length) {
        state.news.map((item) => {
          if (item.id === action.payload.id) {
            item.isShoppingCart = 1;
          }
          return item;
        });
      }
    },
    setNews(state, action) {
      state.news.push(...action.payload);
    },
    setAllNewsCount(state, action) {
      state.allNewsCount = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    resetNews(state) {
      state.page = 1;
      state.allNewsCount = 0;
      state.news = [];
    },
  },
});

export const {
  setNewsIsFavorites,
  setNewsIsShoppingCart,
  setAddNewsIsShoppingCart,
  setNews,
  setAllNewsCount,
  setPage,
  resetNews,
} = newsSlice.actions;

export default newsSlice.reducer;
