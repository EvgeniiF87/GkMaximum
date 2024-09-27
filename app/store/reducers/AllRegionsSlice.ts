import { createSlice } from "@reduxjs/toolkit";
import { IRegion } from "../../entities/Region/types/region-type";

interface IAllRegionsSlice {
  regions: IRegion[];
}

const initialState: IAllRegionsSlice = {
  regions: [],
};

export const allRegionsSlice = createSlice({
  name: "allRegions",
  initialState,
  reducers: {
    setRegions(state, action) {
      state.regions = action.payload;
    },
  },
});

export const { setRegions } = allRegionsSlice.actions;

export default allRegionsSlice.reducer;
