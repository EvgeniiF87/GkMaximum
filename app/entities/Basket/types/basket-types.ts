export interface IBasket {
  count: number;
  description_units?: string;
  id: number;
  img?: string;
  in_stock: number;
  isFavourite?: boolean;
  isShoppingCart?: number;
  price?: number;
  price_discount?: number | null;
  title?: string;
  variable_units?: string;
}

export interface IBasketProduct extends IBasket {
  selected: boolean;
}

export interface IResponseAddFirstProductBasket {
  data: { data: IBasket };
  message: string | null;
  status: string;
}

export interface IResponseGetAllProductsBasket {
  data: {
    currentCount: number;
    items: IBasket[];
    limit: number;
    page: number;
    totalCount: number;
  };
  message: string | null;
  status: string;
}

export interface IResponseDeleteProductBasket {
  data: string;
  message: null;
  status: string;
}
