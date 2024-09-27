import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IHistoryOrder } from "../../entities/history-orders/types/history-orders";

interface IHistoryOrdersSlice {
  orders: IHistoryOrder[];
  allOrdersCount: number;
  page: number;
}

const initialState: IHistoryOrdersSlice = {
  orders: [],
  allOrdersCount: 0,
  page: 1,
};

export const historyOrdersSlice = createSlice({
  name: "historyOrdersSlice",
  initialState,
  reducers: {
    setHistoryOrders(state, action) {
      // state.orders.push(...action.payload);
      state.orders = action.payload;
    },
    setHistoryOrder(state, action: PayloadAction<IHistoryOrder>) {
      state.orders.push(action.payload);
    },
    setAllHistoryOrdersCount(state, action) {
      state.allOrdersCount = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    resetHistoryOrders(state) {
      state.page = 1;
      state.allOrdersCount = 0;
      state.orders = [];
    },
  },
});

export const {
  setHistoryOrders,
  setHistoryOrder,
  setAllHistoryOrdersCount,
  setPage,
  resetHistoryOrders,
} = historyOrdersSlice.actions;

export default historyOrdersSlice.reducer;
