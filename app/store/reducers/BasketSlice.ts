import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBasket } from "../../entities/Basket/types/basket-types";

interface IBasketProduct extends IBasket {
  selected: boolean;
}

interface IBasketSlice {
  products: IBasketProduct[];
  count: number;
}

const initialState: IBasketSlice = {
  products: [],
  count: 0,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addBasketCountWidget(state, action) {
      state.count += action.payload;
    },
    removeBasketCountWidget(state, action) {
      if (state.count <= 0) return;
      state.count -= action.payload;
    },
    setIsFavoritesBasket(state, action: PayloadAction<{ id: number }>) {
      state.products.map((product) => {
        if (product.id === action.payload.id) {
          product.isFavourite = !product.isFavourite;
        }
        return product;
      });
    },
    setCount(state, action) {
      state.count = state.count + action.payload;
    },
    setAllSelected(state) {
      state.products.map((product) => {
        if (product.in_stock === 0) return;
        if (product.selected) return;
        product.selected = !product.selected;
        return product;
      });
    },
    setNotAllSelected(state) {
      state.products.map((product) => {
        if (product.in_stock === 0) return;
        product.selected = false;
        return product;
      });
    },
    setSelected(state, action: PayloadAction<{ id: number }>) {
      state.products.map((product) => {
        if (product.id === action.payload.id) {
          product.selected = !product.selected;
        }

        return product;
      });
    },
    setAllBasketProduct(state, action: PayloadAction<IBasketProduct>) {
      state.products?.push(action.payload);
    },
    setBasketProduct(state, action: PayloadAction<IBasketProduct>) {
      state.products?.push(action.payload);
      state.count = state.count + 1;
    },
    setAddBasketProduct(state, action: PayloadAction<{ id: number }>) {
      state.products.map((product) => {
        if (product.id === action.payload.id) {
          product.count += 1;
          state.count += 1;
        }

        return product;
      });
    },
    setRemoveBasketProduct(state, action: PayloadAction<{ id: number }>) {
      state.products.map((product) => {
        if (product.id === action.payload.id) {
          if (product.count > 0) {
            product.count -= 1;
            state.count -= 1;
          }
        }

        return product;
      });
    },
    setDeleteBasketProducts(state) {
      state.products = [];
      state.count = 0;
    },

    setDeleteBasketProduct(state, action: PayloadAction<number>) {
      state.products = state.products.filter((product) => {
        if (product.id === action.payload)
          state.count = state.count - product.count;
        return product.id !== action.payload;
      });
    },
  },
});

export const {
  addBasketCountWidget,
  removeBasketCountWidget,
  setIsFavoritesBasket,
  setBasketProduct,
  setAddBasketProduct,
  setRemoveBasketProduct,
  setDeleteBasketProducts,
  setAllBasketProduct,
  setCount,
  setSelected,
  setAllSelected,
  setNotAllSelected,
  setDeleteBasketProduct,
} = basketSlice.actions;

export default basketSlice.reducer;
