export interface IConfigurationKey {
  description: string | null;
  id: number;
  key: string;
  name: string;
}

export interface IResponseConfigurationKey {
  data: {
    configurationKey: IConfigurationKey;
  };
  message: string | null;
  status: string;
}

interface IResponseConfigurationKeysData {
  configurationKeys: IConfigurationKey[];
  page: number;
  limit: number;
  totalCount: number;
  currentCount: number;
}

export interface IResponseConfigurationKeys {
  data: IResponseConfigurationKeysData;
  message: string | null;
  status: string;
}
