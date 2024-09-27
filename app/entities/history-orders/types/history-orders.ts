export type statusType = "В сборке" | "Доставлен" | "В пути" | "Отменён";

export interface IHistoryOrder {
  date_canceled: string;
  date_create: string;
  date_delivery: string;
  id: number;
  img: string[];
  prettier_id: string;
  price_result: number;
  status: statusType;
}

interface IHistoryOrdersData {
  orders: IHistoryOrder[] | [];
  totalCount: number;
  currentCount: number;
  page: number;
  limit: number;
}

export interface IResponseHistoryOrders {
  status: string;
  message: string | null;
  data: IHistoryOrdersData;
}

export interface IPriceData {
  id: number;
  description: string;
  img: string;
  price: number;
  price_discount: number;
  title: string;
  variable_units: string | null;
  description_units: string | null;
}

export interface IFullInfoOrderData {
  address_delivery: {
    doorphone: string;
    entrance: string;
    flat: string;
    floor: string;
    house_street: string;
  };
  date_canceled: string | null;
  date_create: string;
  date_delivery: string | null;
  delivery_result: number;
  discount_result: number;
  id: number;
  prettier_id: string;
  priceData: IPriceData[];
  price_result: number;
  recipient: {
    name: string;
    patronymic: string;
    phone: string;
    surname: string;
  };
  status: statusType;
}

export interface IResponseFullInfoOrder {
  status: string;
  message: string | null;
  data: IFullInfoOrderData;
}

export interface IResponseAddFeedbackOrderProduct {
  data: {
    advantage: string;
    comment: string;
    date_Create: string;
    disadvantage: string;
    id: number;
    img: string[];
    item_id: number;
    name: string;
    rate: number;
  };
  message: null;
  status: string;
}
