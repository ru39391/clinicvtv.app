import { sortPositions } from "@/shared/utils";
import { usePricelistStore, type TPriceQueryData } from "@/entities/price";
import type { TPriceData } from "@/shared/types";

export const sortPricelist = async (sortby: TPriceQueryData["sortby"]): Promise<TPriceQueryData | null> => {
  const { data: priceListItems } = usePricelistStore.getState();

  const { arr, data } = await sortPositions<TPriceData>({ data: priceListItems, sortby });

  usePricelistStore.setState({ data: arr });

  return data;
}
