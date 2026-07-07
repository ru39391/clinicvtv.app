import { createStore } from "@/shared/store";
import { testimonialApi } from "../lib/testimonial-api";
import type { TTestimonialData, TTestimonialPayload } from "../model/types";

export const useTestimonialStore = createStore<TTestimonialPayload, TTestimonialData>({
  name: "TestimonialStore",
  api: testimonialApi
});
