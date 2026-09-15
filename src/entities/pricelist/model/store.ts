import { createStore } from "@/shared/store";
import { pricelistApi } from "../lib/pricelist-api";
import type { TPricelistData, TPricelistPayload } from "../model/types";

export const usePricelistStore = createStore<TPricelistPayload, TPricelistData>({
  name: "PricelistStore",
  api: pricelistApi
});
