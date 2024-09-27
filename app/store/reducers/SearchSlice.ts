import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISearchItem } from "../../entities/Search/types/search-types";

interface ISearchSlice {
  searchResult: ISearchItem[];
  allSearchCount: number;
  page: number;
}

const initialState: ISearchSlice = {
  searchResult: [],
  allSearchCount: 0,
  page: 1,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchResultIsFavorites(
      state,
      action: PayloadAction<{ id: number; value: boolean }>
    ) {
      state.searchResult.map((item) => {
        if (item.id === action.payload.id) {
          item.isFavourite = action.payload.value;
        }
        return item;
      });
    },
    setSearchResultIsShoppingCart(
      state,
      action: PayloadAction<{ id: number }>
    ) {
      if (state.searchResult.length) {
        state.searchResult.map((item) => {
          if (item.id === action.payload.id) {
            item.isShoppingCart = 0;
          }
          return item;
        });
      }
    },
    setAddSearchResultIsShoppingCart(
      state,
      action: PayloadAction<{ id: number }>
    ) {
      if (state.searchResult.length) {
        state.searchResult.map((item) => {
          if (item.id === action.payload.id) {
            item.isShoppingCart = 1;
          }
          return item;
        });
      }
    },
    setSearchResult(state, action) {
      state.searchResult.push(...action.payload);
    },
    setAllSearchCount(state, action) {
      state.allSearchCount = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    resetSearchResult(state) {
      state.page = 1;
      state.allSearchCount = 0;
      state.searchResult = [];
    },
  },
});

export const {
  setSearchResultIsFavorites,
  setSearchResultIsShoppingCart,
  setAddSearchResultIsShoppingCart,
  setSearchResult,
  setAllSearchCount,
  setPage,
  resetSearchResult,
} = searchSlice.actions;

export default searchSlice.reducer;
