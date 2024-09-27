import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../entities/Product/types/product-type";

interface IFilteredProductSlice {
  filteredProduct: IProduct[];
  allCount: number;
  page: number;
}

const initialState: IFilteredProductSlice = {
  filteredProduct: [],
  allCount: 0,
  page: 1,
};

export const filteredProductSlice = createSlice({
  name: "filteredProduct",
  initialState,
  reducers: {
    setfFlteredProductFavorites(
      state,
      action: PayloadAction<{ id: number; value: boolean }>
    ) {
      state.filteredProduct.map((item) => {
        if (item.id === action.payload.id) {
          item.isFavourite = action.payload.value;
        }
        return item;
      });
    },
    setfFlteredProductIsShoppingCart(
      state,
      action: PayloadAction<{ id: number }>
    ) {
      state.filteredProduct.map((item) => {
        if (item.id === action.payload.id) {
          item.isShoppingCart = 0;
        }
        return item;
      });
    },
    setAddfFlteredProductIsShoppingCart(
      state,
      action: PayloadAction<{ id: number }>
    ) {
      state.filteredProduct.map((item) => {
        if (item.id === action.payload.id) {
          item.isShoppingCart = 1;
        }
        return item;
      });
    },
    setFilteredProduct(state, action) {
      state.filteredProduct.push(...action.payload);
    },
    setAllCount(state, action) {
      state.allCount = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    resetFilteredProduct(state) {
      state.page = 1;
      state.allCount = 0;
      state.filteredProduct.splice(0, state.filteredProduct.length);
    },
  },
});

export const {
  setfFlteredProductFavorites,
  setfFlteredProductIsShoppingCart,
  setAddfFlteredProductIsShoppingCart,
  setFilteredProduct,
  setPage,
  setAllCount,
  resetFilteredProduct,
} = filteredProductSlice.actions;

export default filteredProductSlice.reducer;
