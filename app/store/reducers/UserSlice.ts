import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../entities/User/types/user-types";
import { IAddMyAddressPayload } from "../../entities/MyAddress/types/my-address-types";

export interface IUserState {
  accessToken: string;
  refreshToken: string;
  isAuth: boolean;
  currentDeleteMyAddressID: string;
  user: Partial<IUser>;
}

const initialState: IUserState = {
  accessToken: "",
  refreshToken: "",
  isAuth: false,
  currentDeleteMyAddressID: "",
  user: {},
};

export const userSlice = createSlice({
  name: "authState",
  initialState,
  reducers: {
    setIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    setRefreshToken(state, action) {
      state.refreshToken = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setUserAvatar(state, action) {
      state.user.avatar = action.payload;
    },
    setUserBirthday(state, action) {
      state.user.birthday = action.payload;
    },
    setUserBonusCount(state, action) {
      state.user.bonus_count = action.payload;
    },
    setUserBonusQR(state, action) {
      state.user.bonus_qr = action.payload;
    },
    setUserCity(state, action) {
      state.user.city = action.payload;
    },
    setUserEmail(state, action) {
      state.user.email = action.payload;
    },
    setUserGender(state, action) {
      state.user.gender = action.payload;
    },
    setUserName(state, action) {
      state.user.name = action.payload;
    },
    setUserPatronymic(state, action) {
      state.user.patronymic = action.payload;
    },
    setUserPhone(state, action) {
      state.user.phone = action.payload;
    },
    setUserSurname(state, action) {
      state.user.surname = action.payload;
    },
    setUserUserName(state, action) {
      state.user.username = action.payload;
    },
    setUserAddresses(state, action) {
      state.user.my_address?.push(action.payload);
    },
    setUserMainAddresses(state, action: PayloadAction<{ id: number }>) {
      state?.user?.my_address?.map((item) => {
        if (item.isMain === 1) item.isMain = 0;
        if (item.id === action.payload.id) {
          item.isMain = 1;
        }
        return item;
      });
    },
    setUserUpdateAddresses(
      state,
      action: PayloadAction<{ id: number; payload: IAddMyAddressPayload }>
    ) {
      state?.user?.my_address?.map((item) => {
        if (item.id === action.payload.id) {
          item.house_street = action.payload.payload.house_street;
          item.flat = action.payload.payload.flat;
          item.doorphone = action.payload.payload.doorphone;
          item.entrance = action.payload.payload.entrance;
          item.floor = action.payload.payload.floor;
          item.isPrivateHouse = action.payload.payload.isPrivateHouse ?? false;
        }
        return item;
      });
    },
    setCurrentDeleteMyAddressID(state, action: PayloadAction<string>) {
      state.currentDeleteMyAddressID = action.payload;
    },
    deleteUserAddresses(state, action: PayloadAction<number>) {
      state.user.my_address = state.user.my_address?.filter(
        ({ id }) => id !== action.payload
      );
    },
    setResetUser(state) {
      state.accessToken = "";
      state.refreshToken = "";
      state.isAuth = false;
      state.user.avatar = "";
      state.user = {};
    },
  },
});

export const {
  setAccessToken,
  setRefreshToken,
  setUser,
  setIsAuth,
  setUserAvatar,
  setUserBirthday,
  setUserBonusCount,
  setUserBonusQR,
  setUserCity,
  setUserEmail,
  setUserGender,
  setUserName,
  setUserPhone,
  setUserSurname,
  setUserUserName,
  setUserPatronymic,
  setResetUser,
  setUserAddresses,
  setUserMainAddresses,
  setUserUpdateAddresses,
  setCurrentDeleteMyAddressID,
  deleteUserAddresses,
} = userSlice.actions;

export default userSlice.reducer;
