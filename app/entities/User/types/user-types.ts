export interface IManagerUser {
  id: number;
  fio: string;
  img: string;
  phone: string;
}

export interface IMyAddressData {
  id: number;
  user_id: number;
  city: string;
  house_street?: string;
  flat?: string;
  entrance?: string;
  doorphone?: string;
  floor?: string;
  isMain: number;
  isPrivateHouse?: boolean;
}

export interface IUser {
  avatar: string;
  birthday: string;
  bonus_count: number;
  bonus_qr: string;
  city: string;
  created_at: string;
  email: string;
  gender: boolean;
  id: number;
  name: string;
  patronymic: string;
  phone: string;
  role: "user" | "wholesaler";
  my_address: IMyAddressData[];
  surname: string;
  updated_at: string;
  username: string;
  registration_type: "phone" | "email";
  manager: IManagerUser;
}

export interface IUserData {
  user: IUser;
}

export interface IRefreshData {
  tokens: { accessToken: string; refreshToken: string; user: IUser };
}

export interface IUserRefreshTokenResponse {
  data: { status: string; message: string; data: IRefreshData };
  error: {
    data: { status: string; message: string; data: null };
    status: number;
  };
}

export interface IUserErrorAuthResponse {
  data: { status: string; message: string; data: null };
  status: number;
}

export interface IUserRestoreAccessResultData {
  tokens: { accessToken: string; refreshToken: string };
  user: IUser;
}

export interface IUserRestoreAccessData {
  message: string;
  result: IUserRestoreAccessResultData;
}

export interface IUserRestoreAccessResponse {
  status: string;
  message: string;
  data: IUserRestoreAccessData;
}

export interface IUserResponse {
  status: string;
  message: string;
  data: IUserData;
}

export interface IUserErrorResponse {
  data: { status: string; message: string; data: null };
}

export interface IUpdateUserInfoRequest {
  avatar?: string;
  email?: string;
  phone?: string;
  surname: string;
  name: string;
  patronymic: string;
  gender?: boolean;
  birthday: string;
  city: string;
}
