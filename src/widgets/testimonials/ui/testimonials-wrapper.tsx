import { useEffect, type FC } from "react";
import { CreatePositionBtn } from "@/features/create-position-btn";
import { Loader } from "@/shared/ui";
import { PaginationCounter, PaginationNav } from "@/features/pagination";
import { PositionsWrapper } from "@/features/positions";
import { ResetPositionsBtn } from "@/features/reset-positions-btn";
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
        aside: (
          <>
            <ResetPositionsBtn<TTestimonialQueryData> {...{ fetchItems, isLoading }} />
            {/*<CreatePositionBtn><CreatePriceItemForm /></CreatePositionBtn>*/}
          </>
        ),
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
