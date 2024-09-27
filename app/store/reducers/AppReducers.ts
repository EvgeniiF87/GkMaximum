import { combineReducers } from "@reduxjs/toolkit";
import basketReducer from "./BasketSlice";
import userReducer from "./UserSlice";
import SearchReducer from "./SearchSlice";
import AppReducer from "./AppSlice";
import GeolocationReducer from "./GeolocationSlice";
import FilterReducer from "./FilterSlice";
import RegionReducer from "./RegionSlice";
import AllRegionsReducer from "./AllRegionsSlice";
import SectionReducer from "./SectionSlice";
import NewsReducer from "./NewsSlice";
import HitsReducer from "./HitSlice";
import PromotionsReducer from "./PromotionsSlice";
import OrderReducer from "./OrderSlice";
import BannersReducer from "./BannersSlice";
import OnbordingReducer from "./OnbordingSlice";
import ConfigurationKeysAndDocumentsReducer from "./ConfigurationKeysAndDocumentsSlice";
import { AuthApi } from "../../api/Auth/AuthApi";
import { MainScreenApi } from "../../api/MainScreen/MainScreenApi";
import { RegionsApi } from "../../api/Region/RegionApi";
import { UserApi } from "../../api/User/UserApi";
import { ProductApi } from "../../api/Product/ProductApi";
import { FavoriteApi } from "../../api/Favorite/FavoriteApi";
import { PromotionsApi } from "../../api/PromotionsApi/PromotionsApi";
import { NewsApi } from "../../api/NewsApi/NewsApi";
import { HitsApi } from "../../api/HitsApi/HitsApi";
import { appApi } from "../../api/AppApi/AppApi";
import { MyAddressApi } from "../../api/MyAddress/MyAddressApi";
import { FilterApi } from "../../api/FilterApi/FilterApi";
import CategoryReducer from "./CategorySlice";
import { CategoriesApi } from "../../api/CategoriesApi/CategoriesApi";
import FilteredProductReducer from "./FilteredProductSlice";
import CatalogProductReducer from "./CatalogProductSlice";
import { HistoryOrdersApi } from "../../api/HistoryOrdersApi/HistoryOrdersApi";
import HistoryOrdersReducer from "./HistoryOrdersSlice";
import { FeedbackApi } from "../../api/FeedbackApi/FeedbackApi";
import ReviewsReducer from "./ReviewsSlice";
import { ReviewsApi } from "../../api/ReviewsApi/ReviewsApi";
import { BasketApi } from "../../api/BasketApi/BasketApi";
import { ConfigurationKeysApi } from "../../api/ConfigurationKeysApi/ConfigurationKeysApi";
import { PlacingAnOrderApi } from "../../api/PlacingAnOrderApi/PlacingAnOrderApi";
import { SearchApi } from "../../api/SearchApi/SearchApi";
import { DocumentsApi } from "../../api/DocumentsApi/DocumentsApi";
import { BannersApi } from "../../api/BannersApi/BannersApi";
import { LogsApi } from "../../api/LogsApi/LogsApi";

export const AppReducers = combineReducers({
  basketReducer,
  userReducer,
  SearchReducer,
  AppReducer,
  GeolocationReducer,
  FilterReducer,
  RegionReducer,
  AllRegionsReducer,
  SectionReducer,
  NewsReducer,
  HitsReducer,
  PromotionsReducer,
  CategoryReducer,
  FilteredProductReducer,
  CatalogProductReducer,
  HistoryOrdersReducer,
  ReviewsReducer,
  OrderReducer,
  BannersReducer,
  OnbordingReducer,
  ConfigurationKeysAndDocumentsReducer,
  [ReviewsApi.reducerPath]: ReviewsApi.reducer,
  [AuthApi.reducerPath]: AuthApi.reducer,
  [RegionsApi.reducerPath]: RegionsApi.reducer,
  [UserApi.reducerPath]: UserApi.reducer,
  [LogsApi.reducerPath]: LogsApi.reducer,
  [`${MainScreenApi.reducerPath}Main`]: MainScreenApi.reducer,
  [`${ProductApi.reducerPath}Product`]: ProductApi.reducer,
  [`${FavoriteApi.reducerPath}Favorites`]: FavoriteApi.reducer,
  [`${PromotionsApi.reducerPath}Promotions`]: PromotionsApi.reducer,
  [`${NewsApi.reducerPath}News`]: NewsApi.reducer,
  [`${HitsApi.reducerPath}Hits`]: HitsApi.reducer,
  [`${MyAddressApi.reducerPath}MyAddress`]: MyAddressApi.reducer,
  [`${FilterApi.reducerPath}Filter`]: FilterApi.reducer,
  [`${CategoriesApi.reducerPath}Category`]: CategoriesApi.reducer,
  [`${HistoryOrdersApi.reducerPath}HistoryOrders`]: HistoryOrdersApi.reducer,
  [`${FeedbackApi.reducerPath}Feedback`]: FeedbackApi.reducer,
  [`${BasketApi.reducerPath}Basket`]: BasketApi.reducer,
  [`${PlacingAnOrderApi.reducerPath}PlacingAnOrder`]: PlacingAnOrderApi.reducer,
  [`${SearchApi.reducerPath}Search`]: SearchApi.reducer,
  [`${DocumentsApi.reducerPath}Documents`]: DocumentsApi.reducer,
  [`${BannersApi.reducerPath}BannersApi`]: BannersApi.reducer,
  [`${ConfigurationKeysApi.reducerPath}ConfigurationKeys`]:
    ConfigurationKeysApi.reducer,
  [appApi.reducerPath]: appApi.reducer,
});
