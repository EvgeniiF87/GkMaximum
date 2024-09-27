export interface IAddProductFeedbackRequestBody {
  name: string;
  item_id: number;
  rate: number;
  advantage: string;
  disadvantage: string;
  comment: string;
  file: string[];
}
