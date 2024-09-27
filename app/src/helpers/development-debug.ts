import { DEVELOPMENT } from "../../config/node_env";

type DevelopmentDebugPropsType =
  | {}
  | []
  | string
  | number
  | boolean
  | undefined
  | unknown;

export const DevelopmentDebug = (value: DevelopmentDebugPropsType) => {
  if (DEVELOPMENT === "dev") console.log(value);
};
