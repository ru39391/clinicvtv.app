import { createSortPositionsList } from "@/shared/store";
import { useTestimonialStore, type TTestimonialPayload, type TTestimonialData } from "@/entities/testimonial";
import { TESTIMONIAL_KEY } from "@/shared/constants"

export const useSortTestimonialsList = createSortPositionsList<TTestimonialPayload, TTestimonialData>(useTestimonialStore, TESTIMONIAL_KEY);
