import { createStore } from "@/shared/store";
import { pricelistApi } from "../lib/pricelist-api";
import type { TPricelistData, TPricelistQueryData, TPricelistPayload } from "../model/types";

export const usePricelistStore = createStore<TPricelistPayload, TPricelistQueryData, TPricelistData>({
  name: "PricelistStore",
  api: pricelistApi
});
