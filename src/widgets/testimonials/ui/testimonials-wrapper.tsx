import { useEffect, type FC } from "react";
import { CreatePositionBtn } from "@/features/create-position-btn";
import { Loader } from "@/shared/ui";
import { ResetPositionsBtn } from "@/features/reset-positions-btn";
import { PaginationCounter, PaginationNav } from "@/features/pagination";
import { PositionsWrapper } from "@/features/positions";
import { TestimonialsList } from "@/features/testimonials-list";
import {
  useTestimonialStore,
  type TTestimonialData,
  type TTestimonialQueryData
} from "@/entities/testimonial";

const TestimonialsWrapper: FC = () => {
  const {
    current: currData,
    fetchItems,
    isLoading,
    pagination,
    setCurrItemData: setCurrData
  } = useTestimonialStore();

  useEffect(() => {
    fetchItems(null);
  }, []);

  return (
    <PositionsWrapper<TTestimonialData>
      {...{
        aside: '<aside />',
        currData,
        form: '<CreatePriceItemForm />',
        footer: (
          <>
            <PaginationCounter {...{ isLoading, pagination }} />
            <PaginationNav<TTestimonialQueryData> {...{ fetchItems, isLoading, pagination }} />
          </>
        ),
        isLoading,
        setCurrData
      }}
    >
      <TestimonialsList />
    </PositionsWrapper>
  )
};

export default TestimonialsWrapper;
