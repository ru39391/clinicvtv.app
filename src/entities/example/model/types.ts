import type {
  TDatesData,
  TDeptsData,
  TItemData,
  TIntroData,
  TPicsData,
  TQueryData
} from "@/shared/types";
import type {
  TPositionApi,
  TPositionState,
  TPositionStore,
} from "@/shared/store";

export type TExampleData = TItemData & TIntroData & TDatesData & TDeptsData & Record<"img_before" | "img_after", TPicsData>;

export type TExamplePayload = Omit<TExampleData, "id" | "introtext" | "createdAt" | "updatedAt" | "img_before" | "img_after"> & Partial<Record<"img_before" | "img_after", string>>;

export type TExampleState = TPositionState<TExampleData>;

export type TExampleQueryData = TQueryData<TExampleData>;

export type TExampleStore = TPositionStore<TExamplePayload, TExampleData>;

export type TExampleApi = TPositionApi<TExamplePayload, TExampleData>;
