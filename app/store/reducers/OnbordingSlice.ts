import { createSlice } from "@reduxjs/toolkit";

interface IOnbordingSlice {
  showOnbording: boolean;
}

const initialState: IOnbordingSlice = {
  showOnbording: true,
};

export const onbordingSlice = createSlice({
  name: "onbording",
  initialState,
  reducers: {
    setHideOnbording(state) {
      state.showOnbording = false;
    },
  },
});

export const { setHideOnbording } = onbordingSlice.actions;

export default onbordingSlice.reducer;
