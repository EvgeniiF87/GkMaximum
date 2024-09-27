export interface IReviewsStatistics {
  totalCount: number;
  averageRate: number;
  images: string[];
  percentRate: {
    one: number;
    two: number;
    three: number;
    four: number;
    five: number;
  };
}

export interface IReviewsComment {
  id: number;
  name: string;
  item_id: number;
  rate: number;
  advantage: string;
  disadvantage: string;
  comment: string;
  date_Create: string;
  img: string[];
}

export interface IResponseReviewsCommentsData {
  feedback: IReviewsComment[];
  totalCount: number;
  currentCount: number;
  page: number;
  limit: number;
}

export interface IResponseReviewsStatistics {
  status: string;
  message: null;
  data: IReviewsStatistics;
}

export interface IRequestReviewsComments {
  item_id: number;
  new: boolean;
  old: boolean;
  highScore: boolean;
  lowScore: boolean;
  isImage: boolean;
  page: number;
  limit: number;
}

export interface IResponseReviewsComments {
  status: string;
  message: null;
  data: IResponseReviewsCommentsData;
}
