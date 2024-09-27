export interface IRequestSearch {
  title: string;
  region_id: number;
  page?: number;
  limit?: number;
}

export interface ISearchItem {
  description_units: string;
  id: number;
  img: string;
  in_stock: number;
  isDiscount: boolean;
  isFavourite: boolean;
  isHit: boolean;
  isNew: boolean;
  isShoppingCart: number;
  price: number;
  price_discount: number;
  title: string;
  variable_units: string;
}

export interface IResponseSearchData {
  currentCount: number;
  items: ISearchItem[];
  limit: number;
  page: number;
  totalCount: number;
}

export interface IResponseSearch {
  data: IResponseSearchData;
  message: string | null;
  status: string;
}
