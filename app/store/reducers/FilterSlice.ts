import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type SortedNameType =
  | "Без сортировки"
  | "По популярности"
  | "По возрастанию цены"
  | "По убыванию цены"
  | "По велечине скидки";
export type SortedSlugType = 0 | 1 | 2 | 3 | 4;

export interface ISorted {
  label: SortedNameType;
  value: SortedSlugType;
}

export interface IOffers {
  label: string;
  value: number;
}

export interface IPrice {
  min: number;
  max: number;
}

interface IFilter {
  sorted: ISorted;
  category: string;
  category_id: string;
  offers: IOffers;
  price: IPrice;
  brands: string[];
  appointment: string[]; //назначение
  scale: string[]; //линейка
  sale: boolean;
  filterSale: boolean;
  filtersCount: string[];
  filterGoBackScreen: boolean;
  title: string;
}

const initialState: IFilter = {
  sorted: { label: "Без сортировки", value: 0 },
  category: "",
  category_id: "",
  offers: { label: "Без фильтров", value: 0 },
  brands: [],
  appointment: [],
  scale: [],
  price: { min: 0, max: 10000 },
  sale: false,
  filterSale: false,
  filtersCount: [],
  filterGoBackScreen: false,
  title: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSorted(
      state,
      action: PayloadAction<{ label: SortedNameType; value: SortedSlugType }>
    ) {
      const { label, value } = action.payload;
      state.sorted.label = label;
      state.sorted.value = value;
    },
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    setCategoryID(state, action: PayloadAction<string>) {
      state.category_id = action.payload;
    },
    setResetCategory(state) {
      state.category = "";
    },
    setOffers(state, action: PayloadAction<IOffers>) {
      state.offers = action.payload;
    },
    setBrands(state, action) {
      state.brands = action.payload;
    },
    setResetBrands(state) {
      state.brands = [];
    },
    setAppointment(state, action) {
      state.appointment = action.payload;
    },
    setResetAppointment(state) {
      state.appointment = [];
    },
    setScale(state, action) {
      state.scale = action.payload;
    },
    setResetScale(state) {
      state.scale = [];
    },
    setMinPrice(state, action) {
      state.price.min = action.payload;
    },
    setMaxPrice(state, action) {
      state.price.max = action.payload;
    },
    setSale(state, action) {
      state.sale = action.payload;
    },
    setFilterSale(state, action) {
      state.filterSale = action.payload;
    },
    setFiltersCount(state, action) {
      state.filtersCount = action.payload;
    },
    setFilterGoBackScreen(state, action) {
      state.filterGoBackScreen = action.payload;
    },
    setFilterTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setResetFilterTitle(state) {
      state.title = "";
    },
    setResetAllFilters(state) {
      state.sorted = { label: "Без сортировки", value: 0 };
      state.category = "";
      state.category_id = "";
      state.offers = { label: "Без фильтров", value: 0 };
      state.brands = [];
      state.appointment = [];
      state.scale = [];
      state.price = { min: 0, max: 10000 };
      state.sale = false;
      state.filterSale = false;
      state.filtersCount = [];
      state.filterGoBackScreen = false;
      state.title = "";
    },
  },
});

export const {
  setSorted,
  setCategory,
  setCategoryID,
  setResetCategory,
  setOffers,
  setBrands,
  setResetBrands,
  setAppointment,
  setResetAppointment,
  setScale,
  setResetScale,
  setMinPrice,
  setMaxPrice,
  setSale,
  setFilterSale,
  setFiltersCount,
  setFilterGoBackScreen,
  setResetAllFilters,
  setFilterTitle,
  setResetFilterTitle,
} = filterSlice.actions;

export default filterSlice.reducer;
