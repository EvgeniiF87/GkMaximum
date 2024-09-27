export interface IRegion {
  id: number;
  name: string;
  date_create?: string;
  date_update?: string | null;
  coords?: null;
}

interface IAllRegions {
  regions: IRegion[];
  totalCount: number;
  currentCount: number;
  page: number;
  limit: number;
}

export interface IAllRegionsResponse {
  status: string;
  message: string | null;
  data: IAllRegions;
}

export interface IRegionNameGeolocationPayload {
  coords: {
    lat: string;
    lon: string;
  };
}

export interface IRegionNameGeolocationResponse {
  status: string;
  message: string | null;
  data: {
    slug: string;
  };
}

export interface IGetRegionResponse {
  status: string;
  message: string | null;
  data: IRegion;
}
