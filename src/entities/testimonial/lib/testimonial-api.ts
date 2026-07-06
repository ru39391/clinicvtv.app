import { createPositionApi } from "@/shared/store";
import { routes } from "@/shared/constants";
import type {
  TTestimonialApi,
  TTestimonialData,
  TTestimonialPayload,
  TTestimonialQueryData
} from "../model/types";

export const testimonialApi: TTestimonialApi = createPositionApi<TTestimonialPayload, TTestimonialQueryData, TTestimonialData>(routes.api.testimonials);
