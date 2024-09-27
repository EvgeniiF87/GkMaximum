export interface IProduct {
  id: number;
  title: string;
  img: string;
  price: number;
  price_discount: number | null;
  isFavourite: boolean;
  isShoppingCart: number;
  isHit: boolean;
  isDiscount: boolean;
  isNew: boolean;
}

export interface VariableUnitsData {
  item_id: number;
  value: string;
}

export interface IProductFullInfoData {
  id: number;
  article: string | null;
  title: string;
  img: string[];
  category_id: number;
  in_stock: number;
  price: number;
  price_discount: number;
  description: string;
  description_units: string;
  variable_units: VariableUnitsData[];
  isHit: boolean;
  isNew: boolean;
  isDiscount: boolean;
  isFavourite: boolean;
  isShoppingCart: number;
  isStock: boolean;
  brand: string | null;
  product_line: string;
  purpose: string;
  description_general: string | null;
  description_use: string | null;
  description_compos: string | null;
  description_brand: string | null;
  description_additional: string | null;
  rate: string;
  recomendation: IProduct[];
}

interface IData {
  byCreate: IProduct[] | [];
  byDiscount: IProduct[] | [];
  byHit: IProduct[] | [];
}

interface IAllProducts {
  items: IProduct[] | [];
  totalCount: number;
  currentCount: number;
  page: number;
  limit: number;
}

export interface IMainScreenResponse {
  status: string;
  message: string | null;
  data: IData;
}

interface IPromotionsData {
  byDiscount: IProduct[] | [];
  totalCount: number;
  currentCount: number;
  page: number;
  limit: number;
}

export interface IPromotionsResponse {
  status: string;
  message: string | null;
  data: IPromotionsData;
}

interface INewsData {
  byCreate: IProduct[] | [];
  totalCount: number;
  currentCount: number;
  page: number;
  limit: number;
}

export interface INewsResponse {
  status: string;
  message: string | null;
  data: INewsData;
}

interface IHitsData {
  byHit: IProduct[] | [];
  totalCount: number;
  currentCount: number;
  page: number;
  limit: number;
}

export interface IHitsResponse {
  status: string;
  message: string | null;
  data: IHitsData;
}

export interface IMainScreenAllProductsResponse {
  status: string;
  message: string | null;
  data: IAllProducts;
}

export interface IProductFullInfoResponse {
  status: string;
  message: string | null;
  data: IProductFullInfoData;
}

export interface IResponseProductIsStockNotification {
  data: string;
  message: null;
  status: string;
}
