import { createSlice } from "@reduxjs/toolkit";
import { Float } from "react-native/Libraries/Types/CodegenTypes";

interface IGeolocation {
  isGranted: boolean;
  latitude: number;
  longitude: number;
}

const initialState: IGeolocation = {
  isGranted: false,
  latitude: 0,
  longitude: 0,
};

export const geolocationSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setIsGranted(state, action) {
      state.isGranted = action.payload;
    },
    setLatitude(state, action) {
      state.latitude = action.payload;
    },
    setLongitude(state, action) {
      state.longitude = action.payload;
    },
  },
});

export const { setIsGranted, setLatitude, setLongitude } =
  geolocationSlice.actions;

export default geolocationSlice.reducer;
