import { categoriesEndpoint, selectedCategoryProducts } from "../config/config";
import {
  IRequestSelectedCategory,
  IResponseCategories,
  IResponseSelectedCategory,
} from "../../entities/Category/types/category-types";
import { appApi } from "../AppApi/AppApi";

export const CategoriesApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<IResponseCategories, any>({
      query: () => categoriesEndpoint,
    }),
    getProductsByCategory: builder.query<
      IResponseSelectedCategory,
      IRequestSelectedCategory
    >({
      query: ({ id, region, page = 1, limit = 6 }) =>
        `${selectedCategoryProducts}/${Number(
          id
        )}?region=${region}&page=${page}&limit=${limit}`,
    }),
  }),
});

export const { useLazyGetCategoriesQuery, useLazyGetProductsByCategoryQuery } =
  CategoriesApi;
