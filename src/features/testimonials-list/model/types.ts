import type { TTestimonialData } from "@/entities/testimonial";

export type TTestimonialsListOptions = Pick<TTestimonialData, "id" | "name"> & { isLoading: boolean };

export interface ITestimonialsList {
  showRemoveModal: ({ id, isLoading, name }: TTestimonialsListOptions) => void;
}
