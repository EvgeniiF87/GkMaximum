import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { authApiEndpoints, devApiUrl } from "../config/config";
import {
  IRegistrationRequestEmail,
  IRegistrationRequestPhone,
  IVerifyCodeRequest,
  ILoginRequestEmail,
  ILoginRequestPhone,
  IResponse,
  IchangePasswordVerify,
  IchangePasswordReset,
} from "../../entities/Auth/types/auth-types";
import { AppState } from "../../store/store";
import { IUserRefreshTokenResponse } from "../../entities/User/types/user-types";
import {
  setAccessToken,
  setRefreshToken,
  setResetUser,
} from "../../store/reducers/UserSlice";

const BaseQueryRefreshToken = fetchBaseQuery({
  baseUrl: devApiUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as AppState).userReducer.refreshToken;
    if (token.length) headers.set("Authorization", `Bearer ${token}`);
  },
});

const BaseQueryAccessToken = fetchBaseQuery({
  baseUrl: devApiUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as AppState).userReducer.accessToken;
    if (token.length) headers.set("Authorization", `Bearer ${token}`);
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

export const AuthApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    registrationEmail: builder.mutation<IResponse, IRegistrationRequestEmail>({
      query(body) {
        return {
          url: authApiEndpoints.registrationEmail,
          method: "POST",
          body,
        };
      },
    }),

    registrationPhone: builder.mutation<IResponse, IRegistrationRequestPhone>({
      query(body) {
        return {
          url: authApiEndpoints.registrationPhone,
          method: "POST",
          body,
        };
      },
    }),

    verifyCode: builder.mutation<IResponse, IVerifyCodeRequest>({
      query(body) {
        return {
          url: authApiEndpoints.verifyCode,
          method: "POST",
          body,
        };
      },
    }),

    loginEmail: builder.mutation<IResponse, ILoginRequestEmail>({
      query(body) {
        return {
          url: authApiEndpoints.loginEmail,
          method: "POST",
          body,
        };
      },
    }),

    loginPhone: builder.mutation<IResponse, ILoginRequestPhone>({
      query(body) {
        return {
          url: authApiEndpoints.loginPhone,
          method: "POST",
          body,
        };
      },
    }),

    logout: builder.mutation<IResponse, {}>({
      query() {
        return {
          url: authApiEndpoints.logout,
          method: "POST",
        };
      },
    }),

    changePassword: builder.mutation<
      IResponse,
      Pick<ILoginRequestEmail, "email">
    >({
      query(body) {
        return {
          url: authApiEndpoints.changePassword,
          method: "POST",
          body,
        };
      },
    }),

    changePasswordVerify: builder.mutation<IResponse, IchangePasswordVerify>({
      query(body) {
        return {
          url: authApiEndpoints.changePasswordVerify,
          method: "POST",
          body,
        };
      },
    }),

    changePasswordReset: builder.mutation<any, IchangePasswordReset>({
      query(body) {
        return {
          url: authApiEndpoints.changePasswordReset,
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const {
  useRegistrationEmailMutation,
  useRegistrationPhoneMutation,
  useVerifyCodeMutation,
  useLoginEmailMutation,
  useLoginPhoneMutation,
  useChangePasswordMutation,
  useChangePasswordVerifyMutation,
  useChangePasswordResetMutation,
  useLogoutMutation,
} = AuthApi;
