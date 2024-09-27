import { createSlice } from "@reduxjs/toolkit";
import { ICategory } from "../../entities/Category/types/category-types";

interface ICategories {
  categories: Partial<ICategory[]>;
}

const initialState: ICategories = {
  categories: [],
};

export const CategoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
  },
});

export const { setCategories } = CategoriesSlice.actions;

export default CategoriesSlice.reducer;
