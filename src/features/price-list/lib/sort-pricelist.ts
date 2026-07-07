import { sortPositions } from "@/shared/utils";
import { usePricelistStore, type TPricelistData, type TPricelistQueryData } from "@/entities/pricelist";

export const sortPricelist = async (sortby: keyof TPricelistData): Promise<TPricelistQueryData | null> => {
  const { data: pricelist } = usePricelistStore.getState();

  const { arr, data } = await sortPositions<TPricelistData>({ data: pricelist, sortby });

  usePricelistStore.setState({ data: arr });

  return data;
}
