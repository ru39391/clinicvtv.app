import { type TPricelistData, type TPricelistStore } from "@/entities/pricelist";

export interface IPriceList {
  arr: TPricelistStore["data"];
  isLoading: TPricelistStore["isLoading"];
  setCurrData: TPricelistStore["setCurrItemData"];
  showRemoveModal: ({ id, name }: Pick<TPricelistData, "id" | "name">) => void;
}
