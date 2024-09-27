import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../entities/Product/types/product-type";

interface IHitsSlice {
  hits: IProduct[];
  allHitsCount: number;
  page: number;
}

const initialState: IHitsSlice = {
  hits: [],
  allHitsCount: 0,
  page: 1,
};

export const hitSlice = createSlice({
  name: "hits",
  initialState,
  reducers: {
    setHitsIsFavorites(
      state,
      action: PayloadAction<{ id: number; value: boolean }>
    ) {
      state.hits.map((item) => {
        if (item.id === action.payload.id) {
          item.isFavourite = action.payload.value;
        }
        return item;
      });
    },
    setHitsIsShoppingCart(state, action: PayloadAction<{ id: number }>) {
      if (state.hits.length) {
        state.hits.map((item) => {
          if (item.id === action.payload.id) {
            item.isShoppingCart = 0;
          }
          return item;
        });
      }
    },
    setAddHitsIsShoppingCart(state, action: PayloadAction<{ id: number }>) {
      if (state.hits.length) {
        state.hits.map((item) => {
          if (item.id === action.payload.id) {
            item.isShoppingCart = 1;
          }
          return item;
        });
      }
    },
    setHits(state, action) {
      state.hits.push(...action.payload);
    },
    setAllHitsCount(state, action) {
      state.allHitsCount = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    resetHits(state) {
      state.page = 1;
      state.allHitsCount = 0;
      state.hits = [];
    },
  },
});

export const {
  setHitsIsFavorites,
  setHitsIsShoppingCart,
  setAddHitsIsShoppingCart,
  setHits,
  setAllHitsCount,
  setPage,
  resetHits,
} = hitSlice.actions;

export default hitSlice.reducer;
