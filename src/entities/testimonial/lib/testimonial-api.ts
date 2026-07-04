import { createPositionApi } from "@/shared/store";
import { routes } from "@/shared/constants";
import type { TTestimonialApi, TTestimonialQueryData } from "../model/types";
import type { TTestimonialData, TTestimonialPayload } from "@/shared/types";

export const testimonialApi: TTestimonialApi = createPositionApi<TTestimonialPayload, TTestimonialQueryData, TTestimonialData>(routes.api.testimonial);
