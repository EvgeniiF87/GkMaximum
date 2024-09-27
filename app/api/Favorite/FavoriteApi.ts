import { favoriteEndpoint } from "../config/config";
import {
  IAddFavoriteResponse,
  IDeleteFavoriteResponse,
  IFavoriteResponse,
} from "../../entities/Favorite/types/favorite-types";
import { ProductsFavoritesBasketsTags } from "../Products-Favorites-Baskets-Tags/ProductsFavoritesBasketsTags";

export const FavoriteApi = ProductsFavoritesBasketsTags.injectEndpoints({
  endpoints: (builder) => ({
    getFavorites: builder.query<
      IFavoriteResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 100 }) =>
        `${favoriteEndpoint}?limit=${limit}&page=${page}`,
      providesTags: (result) => ["Favorites"],
    }),

    addFavorite: builder.mutation<IAddFavoriteResponse, { item_id: number }>({
      query(body) {
        return {
          url: favoriteEndpoint,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Favorites"],
    }),

    deleteFavorite: builder.mutation<IDeleteFavoriteResponse, number>({
      query(id) {
        return {
          url: `${favoriteEndpoint}/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Favorites"],
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
} = FavoriteApi;
