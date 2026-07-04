import type {
  TTestimonialData,
  TTestimonialPayload,
  TQueryData
} from "@/shared/types";
import type {
  TPositionApi,
  TPositionState,
  TPositionStore,
} from "@/shared/store";

export type TTestimonialState = TPositionState<TTestimonialData>;

export type TTestimonialQueryData = TQueryData<keyof TTestimonialData>;

export type TTestimonialStore = TPositionStore<TTestimonialPayload, TTestimonialQueryData, TTestimonialState, TTestimonialData>;

export type TTestimonialApi = TPositionApi<TTestimonialPayload, TTestimonialQueryData, TTestimonialData>;
