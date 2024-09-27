import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../entities/Product/types/product-type";

interface ICatalogProductSlice {
  catalogProduct: IProduct[];
  allCount: number;
  page: number;
  selectedCategory: string;
}

const initialState: ICatalogProductSlice = {
  catalogProduct: [],
  allCount: 0,
  page: 1,
  selectedCategory: "",
};

export const catalogProductSlice = createSlice({
  name: "catalogProduct",
  initialState,
  reducers: {
    setCatalogProductFavorites(
      state,
      action: PayloadAction<{ id: number; value: boolean }>
    ) {
      state.catalogProduct.map((item) => {
        if (item.id === action.payload.id) {
          item.isFavourite = action.payload.value;
        }
        return item;
      });
    },
    setCatalogProductIsShoppingCart(
      state,
      action: PayloadAction<{ id: number }>
    ) {
      if (state.catalogProduct.length) {
        state.catalogProduct.map((item) => {
          if (item.id === action.payload.id) {
            item.isShoppingCart = 0;
          }
          return item;
        });
      }
    },
    setAddCatalogProductIsShoppingCart(
      state,
      action: PayloadAction<{ id: number }>
    ) {
      if (state.catalogProduct.length) {
        state.catalogProduct.map((item) => {
          if (item.id === action.payload.id) {
            item.isShoppingCart = 1;
          }
          return item;
        });
      }
    },
    setCatalogProduct(state, action) {
      state.catalogProduct.push(...action.payload);
    },
    setAllCount(state, action) {
      state.allCount = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    resetCatalogProduct(state) {
      state.page = 1;
      state.allCount = 0;
      state.catalogProduct.splice(0, state.catalogProduct.length);
      state.selectedCategory = "";
    },
  },
});

export const {
  setCatalogProductFavorites,
  setCatalogProductIsShoppingCart,
  setAddCatalogProductIsShoppingCart,
  setCatalogProduct,
  setPage,
  setAllCount,
  setSelectedCategory,
  resetCatalogProduct,
} = catalogProductSlice.actions;

export default catalogProductSlice.reducer;
