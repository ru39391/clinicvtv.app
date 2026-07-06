import { useEffect, type FC } from "react";
import { CreatePositionBtn } from "@/features/create-position-btn";
import { CreateTestimonialItemForm } from "@/features/create-testimonial-item-form";
import { PaginationCounter, PaginationNav } from "@/features/pagination";
import { PositionsWrapper } from "@/features/positions";
import { ResetPositionsBtn } from "@/features/reset-positions-btn";
import { TestimonialsList } from "@/features/testimonials-list";
import { useTestimonialStore, type TTestimonialQueryData } from "@/entities/testimonial";
import type { TTestimonialData } from "@/shared/types";

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
        aside: (
          <>
            <ResetPositionsBtn<TTestimonialQueryData> {...{ fetchItems, isLoading }} />
            <CreatePositionBtn<TTestimonialData> {...{ setCurrData }}>
              <CreateTestimonialItemForm />
            </CreatePositionBtn>
          </>
        ),
        currData,
        form: <CreateTestimonialItemForm />,
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
