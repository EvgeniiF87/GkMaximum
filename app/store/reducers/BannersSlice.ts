import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IBanner,
  IBannerData,
} from "../../entities/Banners/types/banners-types";

interface IBannersSlice {
  topBanners: IBanner[];
  centerBanners: IBanner[];
}

const initialState: IBannersSlice = {
  topBanners: [],
  centerBanners: [],
};

export const bannersSlice = createSlice({
  name: "banners",
  initialState,
  reducers: {
    setBanners(state, action: PayloadAction<{ banners: IBannerData }>) {
      const { banners } = action.payload;
      state.centerBanners = banners.center;
      state.topBanners = banners.top;
    },
    setResetBanners(state) {
      state.topBanners = [];
      state.centerBanners = [];
    },
  },
});

export const { setBanners, setResetBanners } = bannersSlice.actions;

export default bannersSlice.reducer;
