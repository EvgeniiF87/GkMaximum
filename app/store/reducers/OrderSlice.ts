import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  IPlacingAnOrder,
  IPlacingAnOrderItems,
} from "../../entities/PlacingOrder/types/placing-order-types";

const initialState: IPlacingAnOrder = {
  items: [],
  address_delivery: {
    house_street: "",
    flat: "",
    floor: "",
    doorphone: "",
    entrance: "",
  },
  recipient: {
    name: "",
    surname: "",
    patronymic: "",
    phone: "",
  },
  comment: "",
  used_bonus: false,
};

export const orderSlice = createSlice({
  name: "placingAnOrder",
  initialState,
  reducers: {
    setPlacingAnOrderItems(
      state,
      action: PayloadAction<IPlacingAnOrderItems[]>
    ) {
      state.items = action.payload;
    },
    setPlacingAnOrderAddressDeliveryHouseStreet(
      state,
      action: PayloadAction<string>
    ) {
      state.address_delivery.house_street = action.payload;
    },
    setPlacingAnOrderAddressDeliveryFlat(state, action: PayloadAction<string>) {
      state.address_delivery.flat = action.payload;
    },
    setPlacingAnOrderAddressDeliveryFloor(
      state,
      action: PayloadAction<string>
    ) {
      state.address_delivery.floor = action.payload;
    },
    setPlacingAnOrderAddressDeliveryDoorphone(
      state,
      action: PayloadAction<string>
    ) {
      state.address_delivery.doorphone = action.payload;
    },
    setPlacingAnOrderAddressDeliveryEntrance(
      state,
      action: PayloadAction<string>
    ) {
      state.address_delivery.entrance = action.payload;
    },
    setPlacingAnOrderRecipientName(state, action: PayloadAction<string>) {
      state.recipient.name = action.payload;
    },
    setPlacingAnOrderRecipientSurname(state, action: PayloadAction<string>) {
      state.recipient.surname = action.payload;
    },
    setPlacingAnOrderRecipientPatronymic(state, action: PayloadAction<string>) {
      state.recipient.patronymic = action.payload;
    },
    setPlacingAnOrderRecipientPhone(state, action: PayloadAction<string>) {
      state.recipient.phone = action.payload;
    },
    setPlacingAnOrderComment(state, action: PayloadAction<string>) {
      state.comment = action.payload;
    },
    setPlacingAnOrderUsedBonus(state, action: PayloadAction<boolean>) {
      state.used_bonus = action.payload;
    },
    resetOrder(state) {
      state.items = [];
      state.address_delivery = {
        house_street: "",
        flat: "",
        floor: "",
        doorphone: "",
        entrance: "",
      };
      state.recipient = {
        name: "",
        surname: "",
        patronymic: "",
        phone: "",
      };
      state.comment = "";
      state.used_bonus = false;
    },
  },
});

export const {
  setPlacingAnOrderItems,
  setPlacingAnOrderAddressDeliveryHouseStreet,
  setPlacingAnOrderAddressDeliveryFlat,
  setPlacingAnOrderAddressDeliveryFloor,
  setPlacingAnOrderAddressDeliveryDoorphone,
  setPlacingAnOrderAddressDeliveryEntrance,
  setPlacingAnOrderRecipientName,
  setPlacingAnOrderRecipientSurname,
  setPlacingAnOrderRecipientPatronymic,
  setPlacingAnOrderRecipientPhone,
  setPlacingAnOrderComment,
  setPlacingAnOrderUsedBonus,
  resetOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
