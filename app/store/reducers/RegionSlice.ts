import { createSlice } from "@reduxjs/toolkit";
import { IRegion } from "../../entities/Region/types/region-type";

const initialState: IRegion = {
  id: 0,
  name: "Воронеж",
};

export const regionSlice = createSlice({
  name: "region",
  initialState,
  reducers: {
    setCityName(state, action) {
      state.name = action.payload;
    },
    setCityID(state, action) {
      state.id = action.payload;
    },
    setCityCoords(state, action) {
      state.coords = action.payload;
    },
  },
});

export const { setCityName, setCityID, setCityCoords } = regionSlice.actions;

export default regionSlice.reducer;
