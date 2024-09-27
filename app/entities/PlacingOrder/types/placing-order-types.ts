import { IHistoryOrder } from "../../history-orders/types/history-orders";

export interface IPlacingAnOrderItems {
  item_id: number;
  count: number;
}

export interface IPlacingAnOrdAraddressDelivery {
  house_street: string | undefined;
  flat: string | undefined;
  floor: string | undefined;
  doorphone: string | undefined;
  entrance: string | undefined;
}

export interface IPlacingAnOrdRecipient {
  name: string | undefined;
  surname: string | undefined;
  patronymic: string | undefined;
  phone: string | undefined;
}

export interface IPlacingAnOrder {
  items: IPlacingAnOrderItems[];
  address_delivery: IPlacingAnOrdAraddressDelivery;
  recipient: IPlacingAnOrdRecipient;
  comment?: string | undefined;
  used_bonus: boolean;
}

export interface IResponsePlacingAnOrder {
  data: IHistoryOrder;
  message: null;
  status: string;
}
