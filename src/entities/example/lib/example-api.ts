import { createPositionApi } from "@/shared/store";
import { routes } from "@/shared/constants";
import type {
  TExampleApi,
  TExampleData,
  TExamplePayload,
  TExampleQueryData
} from "../model/types";

export const exampleApi: TExampleApi = createPositionApi<TExamplePayload, TExampleQueryData, TExampleData>(routes.api.examples);
