import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppReducers } from "./reducers/AppReducers";
import { Middleware, configureStore } from "@reduxjs/toolkit";
import { AuthApi } from "../api/Auth/AuthApi";
import { MainScreenApi } from "../api/MainScreen/MainScreenApi";
import { RegionsApi } from "../api/Region/RegionApi";
import { UserApi } from "../api/User/UserApi";
import { ProductApi } from "../api/Product/ProductApi";
import { FavoriteApi } from "../api/Favorite/FavoriteApi";
import { PromotionsApi } from "../api/PromotionsApi/PromotionsApi";
import { NewsApi } from "../api/NewsApi/NewsApi";
import { HitsApi } from "../api/HitsApi/HitsApi";
import { appApi } from "../api/AppApi/AppApi";
import { MyAddressApi } from "../api/MyAddress/MyAddressApi";
import { FilterApi } from "../api/FilterApi/FilterApi";
import { CategoriesApi } from "../api/CategoriesApi/CategoriesApi";
import { HistoryOrdersApi } from "../api/HistoryOrdersApi/HistoryOrdersApi";
import { FeedbackApi } from "../api/FeedbackApi/FeedbackApi";
import { ReviewsApi } from "../api/ReviewsApi/ReviewsApi";
import { BasketApi } from "../api/BasketApi/BasketApi";
import { ConfigurationKeysApi } from "../api/ConfigurationKeysApi/ConfigurationKeysApi";
import { PlacingAnOrderApi } from "../api/PlacingAnOrderApi/PlacingAnOrderApi";
import { SearchApi } from "../api/SearchApi/SearchApi";
import { DocumentsApi } from "../api/DocumentsApi/DocumentsApi";
import { BannersApi } from "../api/BannersApi/BannersApi";
import { LogsApi } from "../api/LogsApi/LogsApi";

const persistConfig = {
  key: "gk-maximum",
  storage: AsyncStorage,
  whitelist: [
    "basketReducer",
    "userReducer",
    "RegionReducer",
    "HistoryOrdersReducer",
    "OnbordingReducer",
  ],
};

const persistedReducer = persistReducer(persistConfig, AppReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
    })
      .concat(AuthApi.middleware as Middleware)
      .concat(MainScreenApi.middleware as Middleware)
      .concat(RegionsApi.middleware as Middleware)
      .concat(UserApi.middleware as Middleware)
      .concat(ProductApi.middleware as Middleware)
      .concat(FavoriteApi.middleware as Middleware)
      .concat(appApi.middleware as Middleware)
      .concat(PromotionsApi.middleware as Middleware)
      .concat(HitsApi.middleware as Middleware)
      .concat(NewsApi.middleware as Middleware)
      .concat(MyAddressApi.middleware as Middleware)
      .concat(FilterApi.middleware as Middleware)
      .concat(CategoriesApi.middleware as Middleware)
      .concat(HistoryOrdersApi.middleware as Middleware)
      .concat(FeedbackApi.middleware as Middleware)
      .concat(ReviewsApi.middleware as Middleware)
      .concat(BasketApi.middleware as Middleware)
      .concat(ConfigurationKeysApi.middleware as Middleware)
      .concat(PlacingAnOrderApi.middleware as Middleware)
      .concat(DocumentsApi.middleware as Middleware)
      .concat(BannersApi.middleware as Middleware)
      .concat(SearchApi.middleware as Middleware)
      .concat(LogsApi.middleware as Middleware),
});

export type AppState = ReturnType<typeof AppReducers>;
export type AppStore = typeof store.dispatch;
export type AppDispatch = AppStore;

export const persistor = persistStore(store);
