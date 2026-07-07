import { createSortPositionsList } from "@/shared/store";
import { useTestimonialStore, type TTestimonialPayload, type TTestimonialData } from "@/entities/testimonial";

export const useSortTestimonialsList = createSortPositionsList<TTestimonialPayload, TTestimonialData>(useTestimonialStore);
