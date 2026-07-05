import { sortPositions } from "@/shared/utils";
import { useTestimonialStore, type TTestimonialQueryData } from "@/entities/testimonial";
import type { TTestimonialData } from "@/shared/types";

export const sortTestimonials = async (sortby: TTestimonialQueryData["sortby"]): Promise<TTestimonialQueryData | null> => {
  const { data: testimonials } = useTestimonialStore.getState();

  const { arr, data } = await sortPositions<TTestimonialData>({ data: testimonials, sortby });

  useTestimonialStore.setState({ data: arr });

  return data;
}
