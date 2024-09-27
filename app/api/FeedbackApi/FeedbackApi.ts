import { IResponseAddFeedbackOrderProduct } from "../../entities/history-orders/types/history-orders";
import { appApi } from "../AppApi/AppApi";
import { feedbackEndpoint } from "../config/config";

export const FeedbackApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    addProductFeedback: builder.mutation<IResponseAddFeedbackOrderProduct, any>(
      {
        query(body) {
          return {
            url: feedbackEndpoint,
            method: "POST",
            headers: {
              "Content-Type": "multipart/form-data",
            },
            body,
          };
        },
      }
    ),
  }),
});

export const { useAddProductFeedbackMutation } = FeedbackApi;
