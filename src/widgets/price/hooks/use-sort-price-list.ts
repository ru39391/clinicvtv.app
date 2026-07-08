import { createSortPositionsList } from "@/shared/store";
import { usePricelistStore, type TPricelistPayload, type TPricelistData } from "@/entities/pricelist";
import { PRICE_KEY } from "@/shared/constants"

export const useSortPriceList = createSortPositionsList<TPricelistPayload, TPricelistData>(usePricelistStore, PRICE_KEY);
