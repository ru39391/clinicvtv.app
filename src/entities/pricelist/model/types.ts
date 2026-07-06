import type {
  TDatesData,
  TDeptsData,
  TItemData,
  TQueryData
} from "@/shared/types";
import type {
  TPositionApi,
  TPositionState,
  TPositionStore,
} from "@/shared/store";

export type TPricelistData = TItemData & TDatesData & Omit<TDeptsData, "spec_id"> & { price: number; isMinValue: 1 | 0; };

export type TPricelistPayload = Omit<TPricelistData, "id" | "introtext" | "createdAt" | "updatedAt">;

export type TPricelistState = TPositionState<TPricelistData>;

export type TPricelistQueryData = TQueryData<keyof TPricelistData>;

export type TPricelistStore = TPositionStore<TPricelistPayload, TPricelistQueryData, TPricelistData>;

export type TPricelistApi = TPositionApi<TPricelistPayload, TPricelistQueryData, TPricelistData>;
