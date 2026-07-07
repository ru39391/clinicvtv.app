import { createPositionApi } from "@/shared/store";
import { routes } from "@/shared/constants";
import type { TExampleApi, TExampleData, TExamplePayload } from "../model/types";

export const exampleApi: TExampleApi = createPositionApi<TExamplePayload, TExampleData>(routes.api.examples);
