import { createPositionApi } from "@/shared/store";
import { routes } from "@/shared/constants";
import { EXAMPLE_KEY } from "@/shared/constants";
import type { TExampleApi, TExampleData, TExamplePayload } from "../model/types";

export const exampleApi: TExampleApi = createPositionApi<TExamplePayload, TExampleData>(routes.api[EXAMPLE_KEY], EXAMPLE_KEY);
