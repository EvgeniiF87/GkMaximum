import { IProduct } from "../../Product/types/product-type";

export interface IFavorite {
  id: number;
  title: string;
  img: string;
  price: number;
  price_discount: number | null;
  isFavourite: boolean;
}

export interface IFavoriteData {
  items: IProduct[] | [];
  totalCount: number;
  currentCount: number;
  page: number;
  limit: number;
}

export interface IFavoriteResponse {
  status: string;
  message: string;
  data: IFavoriteData;
}

export interface IAddFavoriteResponse {
  status: string;
  message: string;
  data: string;
}

export interface IDeleteFavoriteResponse {
  status: string;
  message: string;
  data: string;
}

export interface IAddFavoriteErrorResponse {
  status: string | number;
  data: IAddFavoriteResponse;
}
