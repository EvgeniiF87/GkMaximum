import { appApi } from "../AppApi/AppApi";

export const ProductsFavoritesBasketsTags = appApi.enhanceEndpoints({
  addTagTypes: ["Favorites", "Baskets"],
});
