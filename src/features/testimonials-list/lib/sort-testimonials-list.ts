import { sortPositions } from "@/shared/utils";
import { useTestimonialStore, type TTestimonialData, type TTestimonialQueryData } from "@/entities/testimonial";

export const sortTestimonials = async (sortby: keyof TTestimonialData): Promise<TTestimonialQueryData | null> => {
  const { data: testimonials } = useTestimonialStore.getState();

  const { arr, data } = await sortPositions<TTestimonialData>({ data: testimonials, sortby });

  useTestimonialStore.setState({ data: arr });

  return data;
}
