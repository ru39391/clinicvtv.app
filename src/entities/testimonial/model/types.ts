import type {
  TDatesData,
  TDeptsData,
  TItemData,
  TIntroData,
  TQueryData
} from "@/shared/types";
import type {
  TPositionApi,
  TPositionState,
  TPositionStore,
} from "@/shared/store";

export type TTestimonialData = TItemData & TIntroData & TDatesData & Pick<TDeptsData, "spec_id"> & { rating: number };

export type TTestimonialPayload = Omit<TTestimonialData, "id" | "introtext" | "createdAt" | "updatedAt">;

export type TTestimonialState = TPositionState<TTestimonialData>;

export type TTestimonialQueryData = TQueryData<TTestimonialData>;

export type TTestimonialStore = TPositionStore<TTestimonialPayload, TTestimonialData>;

export type TTestimonialApi = TPositionApi<TTestimonialPayload, TTestimonialData>;
