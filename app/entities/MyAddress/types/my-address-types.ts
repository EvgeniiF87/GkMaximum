export interface IAddMyAddressPayload {
  city?: string;
  house_street?: string;
  flat?: string | undefined;
  entrance?: string | undefined;
  doorphone?: string | undefined;
  floor?: string | undefined;
  isPrivateHouse?: boolean | null;
}

export interface IAddMyAddressDataResponse extends IAddMyAddressPayload {
  isMain: number;
}
export interface IMyAddress extends IAddMyAddressPayload {
  id: number;
  isMain: number;
}

export interface IAddMyAddressResponse {
  status: string;
  message: string;
  data: IAddMyAddressDataResponse;
}

export interface IAddMyAddressErrorResponse {
  data: { status: string; message: string; data: null };
  status: number;
}
