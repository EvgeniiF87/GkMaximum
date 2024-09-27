import { IUser } from "../../User/types/user-types";

export interface IRegistrationRequestEmail {
  name: string;
  surname: string;
  password: string;
  repeat_password: string;
  email: string;
}

export interface IVerifyCodeRequest {
  email?: string;
  phone?: string;
  code: number;
  firebase_id: string | undefined;
}

export interface IRegistrationRequestPhone {
  name: string;
  surname: string;
  phone: string;
}

export interface ILoginRequestEmail {
  email: string;
  password: string;
  firebase_id: string | undefined;
}

export interface ILoginRequestPhone {
  phone: string;
}

export interface IchangePasswordVerify {
  email?: string;
  code: number;
}

export interface IchangePasswordReset {
  code?: number;
  password: string;
  repeat_password: string;
}

export interface IData {
  tokens: { accessToken: string; refreshToken: string };
  user: IUser;
}

export interface IResponse {
  status: string;
  message: string;
  data: IData;
}

export interface IResponseError {
  data?: IResponse;
  status?: string;
}
