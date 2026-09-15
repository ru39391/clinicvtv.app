import { createPositionApi } from "@/shared/store";
import { routes } from "@/shared/constants";
import { TESTIMONIAL_KEY } from "@/shared/constants";
import type { TTestimonialApi, TTestimonialData, TTestimonialPayload } from "../model/types";

export const testimonialApi: TTestimonialApi = createPositionApi<TTestimonialPayload, TTestimonialData>(routes.api[TESTIMONIAL_KEY], TESTIMONIAL_KEY);
