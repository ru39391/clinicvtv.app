import { createPositionApi } from "@/shared/store";
import { routes } from "@/shared/constants";
import type {
  TPricelistApi,
  TPricelistData,
  TPricelistPayload,
  TPricelistQueryData
} from "../model/types";

export const pricelistApi: TPricelistApi = createPositionApi<TPricelistPayload, TPricelistQueryData, TPricelistData>(routes.api.price);
