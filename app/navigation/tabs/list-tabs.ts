import Basket from "../../screens/Basket/Basket";
import CatalogAndSearch from "../../screens/CatalogAndSearch/Catalog";
import Favorites from "../../screens/Favorites/Favorites";
import { AppIcons } from "../../src/Icons";
import { CatalogAndSearchNavigation } from "../catalog-and-search/catalog-and-search-navigation";
import { HomeNavigation } from "../home/home-navigation";
import { ProfileNavigation } from "../profile/profile-navigation";
import { mainTabNavigationType } from "../routes/types";

export const listTabs: mainTabNavigationType[] = [
  {
    name: "TabHome",
    component: HomeNavigation,
    label: "Главная",
    viewBox: "20 20",
    icon: (color: string) => AppIcons.tabNavigationIcons.main(color),
  },
  {
    name: "TabCatalogAndSearch",
    component: CatalogAndSearchNavigation,
    label: "Каталог",
    viewBox: "24 17",
    icon: (color: string) =>
      AppIcons.tabNavigationIcons.catalogAndSearch(color),
  },
  {
    name: "TabFavorites",
    component: Favorites,
    label: "Избранное",
    viewBox: "21 18",
    icon: (color: string) => AppIcons.tabNavigationIcons.favorites(color),
  },
  {
    name: "TabBasket",
    component: Basket,
    label: "Корзина",
    viewBox: "20 20",
    icon: (color: string) => AppIcons.tabNavigationIcons.basket(color),
  },
  {
    name: "TabProfile",
    component: ProfileNavigation,
    label: "Профиль",
    viewBox: "22 22",
    icon: (color: string) => AppIcons.tabNavigationIcons.profile(color),
  },
];
