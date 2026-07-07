import { createPositionApi } from "@/shared/store";
import { routes } from "@/shared/constants";
import type { TPricelistApi, TPricelistData, TPricelistPayload } from "../model/types";

export const pricelistApi: TPricelistApi = createPositionApi<TPricelistPayload, TPricelistData>(routes.api.price);
