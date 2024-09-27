import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
  retry,
} from "@reduxjs/toolkit/query/react";
import { devApiUrl } from "../config/config";
import { AppState } from "../../store/store";
import { IUserRefreshTokenResponse } from "../../entities/User/types/user-types";
import {
  setAccessToken,
  setRefreshToken,
  setIsAuth,
  setResetUser,
} from "../../store/reducers/UserSlice";

const BaseQueryRefreshToken = fetchBaseQuery({
  baseUrl: devApiUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as AppState).userReducer.refreshToken;
    const isAuth = (getState() as AppState).userReducer.isAuth;
    if (isAuth) return headers.set("Authorization", `Bearer ${token}`);
  },
});

const BaseQueryAccessToken = fetchBaseQuery({
  baseUrl: devApiUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as AppState).userReducer.accessToken;
    const isAuth = (getState() as AppState).userReducer.isAuth;
    if (isAuth) return headers.set("Authorization", `Bearer ${token}`);
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await BaseQueryAccessToken(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await BaseQueryRefreshToken(
      "api/refresh",
      api,
      extraOptions
    );

    const { data } = refreshResult as unknown as IUserRefreshTokenResponse;

    if (data) {
      const { accessToken, refreshToken } = data.data.tokens;
      api.dispatch(setAccessToken(accessToken));
      api.dispatch(setRefreshToken(refreshToken));
      api.dispatch(setIsAuth(true));
      result = await BaseQueryAccessToken(args, api, extraOptions);
    } else {
      api.dispatch(setResetUser());
    }
  }
  return result;
};

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: retry(baseQueryWithReauth, { maxRetries: 3 }),
  endpoints: () => ({}),
});
