import { createSortPositionsList } from "@/shared/store";
import { usePricelistStore, type TPricelistPayload, type TPricelistData } from "@/entities/pricelist";

export const useSortPriceList = createSortPositionsList<TPricelistPayload, TPricelistData>(usePricelistStore);
