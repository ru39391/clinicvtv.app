import { createStore } from "@/shared/store";
import { testimonialApi } from "../lib/testimonial-api";
import type { TTestimonialData, TTestimonialQueryData, TTestimonialPayload } from "../model/types";

export const useTestimonialStore = createStore<TTestimonialPayload, TTestimonialQueryData, TTestimonialData>({
  name: "TestimonialStore",
  api: testimonialApi
});
