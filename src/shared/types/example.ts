import type {
  TDatesData,
  TDeptsData,
  TItemData,
  TIntroData,
  TPicsData
} from "./common";

export type TExampleData = TItemData & TIntroData & TDatesData & TDeptsData & Record<"img_before" | "img_after", TPicsData>;

export type TExamplePayload = Omit<TExampleData, "id" | "introtext" | "createdAt" | "updatedAt" | "img_before" | "img_after"> & Record<"img_before" | "img_after", string>;
