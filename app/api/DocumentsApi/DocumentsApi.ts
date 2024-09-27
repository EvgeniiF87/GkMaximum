import { IResponseGetAllDocuments } from "../../entities/Documents/types/documents-types";
import { appApi } from "../AppApi/AppApi";

export const DocumentsApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDocuments: builder.query<IResponseGetAllDocuments, any>({
      query: () => ({
        url: "/api/document",
      }),
    }),
  }),
});

export const { useLazyGetAllDocumentsQuery } = DocumentsApi;
