export interface IContext {
  status: string;
  message: string;
  body: {};
}

interface IAdditionalContext {
  localTime: string;
  date: Date;
  deviceOS: string;
  versionOS: string;
  context: IContext;
}

export interface ILogs {
  project_id: string;
  type: "success" | "warn" | "error";
  message: string;
  user_id: string;
  device_id: string;
  additional_context: IAdditionalContext;
  version: string;
  mode: "dev" | "prod";
}
