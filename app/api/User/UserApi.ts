import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
  retry,
} from "@reduxjs/toolkit/query/react";
import { devApiUrl, userApiEndpoints } from "../config/config";
import { AppState } from "../../store/store";
import {
  IUpdateUserInfoRequest,
  IUserRefreshTokenResponse,
  IUserResponse,
} from "../../entities/User/types/user-types";
import {
  setResetUser,
  setAccessToken,
  setRefreshToken,
} from "../../store/reducers/UserSlice";
import { DevelopmentDebug } from "../../src/helpers/development-debug";

const BaseQueryRefreshToken = fetchBaseQuery({
  baseUrl: devApiUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as AppState).userReducer.refreshToken;
    headers.set("Authorization", `Bearer ${token}`);
  },
});

const BaseQueryAccessToken = fetchBaseQuery({
  baseUrl: devApiUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as AppState).userReducer.accessToken;
    headers.set("Authorization", `Bearer ${token}`);
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
      result = await BaseQueryAccessToken(args, api, extraOptions);
    } else {
      api.dispatch(setResetUser());
    }
  }

  return result;
};

export const UserApi = createApi({
  reducerPath: "userApi",
  baseQuery: retry(baseQueryWithReauth, { maxRetries: 3 }),
  endpoints: (builder) => ({
    getUserInfo: builder.query<IUserResponse, void>({
      query: () => userApiEndpoints.currentUser,
    }),

    updateUserInfo: builder.mutation<IUserResponse, {}>({
      query(body) {
        return {
          url: userApiEndpoints.currentUser,
          method: "PUT",
          body,
        };
      },
    }),
    updateUserAvatar: builder.mutation<IUserResponse, {}>({
      query(avatar) {
        return {
          url: userApiEndpoints.userAvatar,
          method: "PUT",
          body: avatar,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
      },
    }),
    deleteUserAvatar: builder.mutation<IUserResponse, null>({
      query() {
        return {
          url: userApiEndpoints.userAvatar,
          method: "DELETE",
        };
      },
    }),
    changePasswordUser: builder.mutation<
      IUserResponse,
      { oldPassword: string; newPassword: string }
    >({
      query(password) {
        return {
          url: userApiEndpoints.userChangePassword,
          method: "PUT",
          body: password,
        };
      },
    }),
    deleteUserAccount: builder.mutation<IUserResponse, any>({
      query() {
        return {
          url: userApiEndpoints.currentUser,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useLazyGetUserInfoQuery,
  useUpdateUserInfoMutation,
  useUpdateUserAvatarMutation,
  useDeleteUserAvatarMutation,
  useChangePasswordUserMutation,
  useDeleteUserAccountMutation,
} = UserApi;
