import { createStore } from "@/shared/store";
import { testimonialApi } from "../lib/testimonial-api";
import type { TTestimonialQueryData } from "../model/types";
import type { TTestimonialData, TTestimonialPayload } from "@/shared/types";

export const useTestimonialStore = createStore<TTestimonialPayload, TTestimonialQueryData, TTestimonialData>({
  name: "TestimonialStore",
  api: testimonialApi
});
