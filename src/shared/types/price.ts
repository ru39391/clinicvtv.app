import type { TItemData, TDatesData, TDeptsData } from "./common";

export type TPriceData = TItemData & TDatesData & Omit<TDeptsData, "spec_id"> & { price: number; isMinValue: 1 | 0; };

export type TPricePayload = Omit<TPriceData, "id" | "createdAt" | "updatedAt">;
