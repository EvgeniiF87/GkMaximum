export interface IBanner {
  id: number;
  region_id: number | null;
  title: string;
  img: string;
  url: string;
  orientation: "top" | "center";
}

export interface IBannerData {
  center: IBanner[];
  top: IBanner[];
}

export interface IGetRegionBannersResponse {
  status: "success" | "error";
  message: string | null;
  data: IBannerData;
}
