import { IProduct } from "../../Product/types/product-type";

export interface ICategory {
  id: number;
  title: string;
  img: string;
  parent_category: number | null;
  category: ICategory[] | [];
}

export interface IResponseCategories {
  status: string;
  message: string | null;
  data: ICategory[];
}

interface ISelectedCategoryData {
  items: IProduct[] | [];
  totalCount: number;
  currentCount: number;
  page: number;
  limit: number;
}

export interface IResponseSelectedCategory {
  status: string;
  message: string | null;
  data: ISelectedCategoryData;
}

export interface IRequestSelectedCategory {
  id: number;
  region: string;
  limit?: number;
  page?: number;
}
