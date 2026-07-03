import type {
  TDatesData,
  TDeptsData,
  TItemData,
  TIntroData
} from "./common";

export type TTestimonialData = TItemData & TIntroData & TDatesData & Pick<TDeptsData, "spec_id"> & { rating: number };

export type TTestimonialPayload = Omit<TTestimonialData, "id" | "introtext" | "createdAt" | "updatedAt">;
