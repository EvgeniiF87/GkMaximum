import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logsServerUrl } from "../config/config";
import { ILogs } from "../../entities/Logs/types/logs-types";

export const LogsApi = createApi({
  reducerPath: "LogsApi",
  baseQuery: fetchBaseQuery({ baseUrl: logsServerUrl }),
  endpoints: (build) => ({
    sendLogs: build.mutation<any, ILogs>({
      query: (body) => ({
        url: "/api/ajax-add-project-log",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSendLogsMutation } = LogsApi;
