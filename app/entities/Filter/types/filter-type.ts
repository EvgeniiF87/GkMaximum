import { IProduct } from "../../Product/types/product-type";

export interface IAllFiltersData {
  purpose: string[];
  brands: string[];
  product_line: string[];
}

export interface IAllFilters {
  data: IAllFiltersData;
  message: string | null;
  status: string;
}

export interface IResultFilterResponse {
  data: {
    currentCount: number;
    limit: number;
    page: number;
    result: IProduct[];
    totalCount: number;
  };
  message: string | null;
  status: string;
}

export interface IResultFilterRequest {
  purpose: string[] | undefined;
  brand: string[] | undefined;
  product_line: string[] | undefined;
  price:
    | {
        min: number;
        max: number;
      }
    | undefined;
  region: string;
  isDiscount: boolean;
  sorted: number | undefined;
  our_purpose: number | undefined;
  title: string | undefined;
  category_id: number | undefined;
  page?: number;
  limit?: number;
}
