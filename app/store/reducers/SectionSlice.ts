import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../entities/Product/types/product-type";

interface ISectionSlice {
  news: IProduct[] | [];
  hits: IProduct[] | [];
  sales: IProduct[] | [];
  allProducts: IProduct[];
  allProductsCount: number;
  page: number;
}

const initialState: ISectionSlice = {
  news: [],
  hits: [],
  sales: [],
  allProducts: [],
  allProductsCount: 0,
  page: 1,
};

export const sectionSlice = createSlice({
  name: "section",
  initialState,
  reducers: {
    setNews(state, action) {
      state.news = action.payload;
    },
    setIsFavorites(
      state,
      action: PayloadAction<{ id: number; value: boolean }>
    ) {
      state.news.map((item) => {
        if (item.id === action.payload.id) {
          item.isFavourite = action.payload.value;
        }
        return item;
      });

      state.hits.map((item) => {
        if (item.id === action.payload.id) {
          item.isFavourite = action.payload.value;
        }
        return item;
      });

      state.sales.map((item) => {
        if (item.id === action.payload.id) {
          item.isFavourite = action.payload.value;
        }
        return item;
      });

      state.allProducts.map((item) => {
        if (item.id === action.payload.id) {
          item.isFavourite = action.payload.value;
        }
        return item;
      });
    },
    setIsShoppingCart(state, action: PayloadAction<{ id: number }>) {
      state.news.map((item) => {
        if (item.id === action.payload.id) {
          item.isShoppingCart = 0;
        }
        return item;
      });

      state.hits.map((item) => {
        if (item.id === action.payload.id) {
          item.isShoppingCart = 0;
        }
        return item;
      });

      state.sales.map((item) => {
        if (item.id === action.payload.id) {
          item.isShoppingCart = 0;
        }
        return item;
      });

      state.allProducts.map((item) => {
        if (item.id === action.payload.id) {
          item.isShoppingCart = 0;
        }
        return item;
      });
    },
    setAddIsShoppingCart(state, action: PayloadAction<{ id: number }>) {
      state.news.map((item) => {
        if (item.id === action.payload.id) {
          item.isShoppingCart = 1;
        }
        return item;
      });

      state.hits.map((item) => {
        if (item.id === action.payload.id) {
          item.isShoppingCart = 1;
        }
        return item;
      });

      state.sales.map((item) => {
        if (item.id === action.payload.id) {
          item.isShoppingCart = 1;
        }
        return item;
      });

      state.allProducts.map((item) => {
        if (item.id === action.payload.id) {
          item.isShoppingCart = 1;
        }
        return item;
      });
    },
    setHits(state, action) {
      state.hits = action.payload;
    },
    setSales(state, action) {
      state.sales = action.payload;
    },
    setAllProducts(state, action) {
      state.allProducts.push(...action.payload);
    },
    setAllProductsReset(state) {
      state.allProducts.splice(0, state.allProducts.length);
    },
    setAllProductsCount(state, action) {
      state.allProductsCount = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
  },
});

export const {
  setNews,
  setHits,
  setSales,
  setAllProducts,
  setAllProductsReset,
  setAllProductsCount,
  setPage,
  setIsFavorites,
  setIsShoppingCart,
  setAddIsShoppingCart,
} = sectionSlice.actions;

export default sectionSlice.reducer;
