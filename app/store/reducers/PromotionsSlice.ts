import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../entities/Product/types/product-type";

interface IPromotionsSlice {
  promotions: IProduct[];
  allPromotionsCount: number;
  page: number;
}

const initialState: IPromotionsSlice = {
  promotions: [],
  allPromotionsCount: 0,
  page: 1,
};

export const promotionsSlice = createSlice({
  name: "promotions",
  initialState,
  reducers: {
    setPromotionsIsFavorites(
      state,
      action: PayloadAction<{ id: number; value: boolean }>
    ) {
      state.promotions.map((item) => {
        if (item.id === action.payload.id) {
          item.isFavourite = action.payload.value;
        }
        return item;
      });
    },
    setPromotionsIsShoppingCart(state, action: PayloadAction<{ id: number }>) {
      if (state.promotions.length) {
        state.promotions.map((item) => {
          if (item.id === action.payload.id) {
            item.isShoppingCart = 0;
          }
          return item;
        });
      }
    },
    setAddPromotionsIsShoppingCart(
      state,
      action: PayloadAction<{ id: number }>
    ) {
      if (state.promotions.length) {
        state.promotions.map((item) => {
          if (item.id === action.payload.id) {
            item.isShoppingCart = 1;
          }
          return item;
        });
      }
    },
    setPromotions(state, action) {
      state.promotions.push(...action.payload);
    },
    setAllPromotionsCount(state, action) {
      state.allPromotionsCount = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    resetPromotions(state) {
      state.page = 1;
      state.allPromotionsCount = 0;
      state.promotions = [];
    },
  },
});

export const {
  setPromotionsIsFavorites,
  setPromotionsIsShoppingCart,
  setAddPromotionsIsShoppingCart,
  setPromotions,
  setAllPromotionsCount,
  setPage,
  resetPromotions,
} = promotionsSlice.actions;

export default promotionsSlice.reducer;
