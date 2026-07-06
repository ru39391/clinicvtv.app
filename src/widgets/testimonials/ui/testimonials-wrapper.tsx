import { useEffect, type FC } from "react";
import { CreatePositionBtn } from "@/features/create-position-btn";
import { CreateTestimonialItemForm } from "@/features/create-testimonial-item-form";
import { PaginationCounter, PaginationNav } from "@/features/pagination";
import { PositionsWrapper } from "@/features/positions";
import { RemovePositionModal } from "@/features/remove-position-modal";
import { ResetPositionsBtn } from "@/features/reset-positions-btn";
import { TestimonialsList } from "@/features/testimonials-list";
import { useModalStore } from "@/shared/store";
import { useTestimonialStore, type TTestimonialData, type TTestimonialQueryData } from "@/entities/testimonial";

const TestimonialsWrapper: FC = () => {
  const { open } = useModalStore();
  const {
    data: arr,
    current: currData,
    fetchItems,
    removeItem,
    setCurrItemData: setCurrData,
    isLoading,
    pagination,
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
      <TestimonialsList
        showRemoveModal={({ id, name }: Pick<TTestimonialData, "id" | "name">) => open({
          content: <RemovePositionModal<TTestimonialData> {...{ id, isLoading, name, removeItem }} />
        })}
        {...{
          arr,
          isLoading,
          setCurrData,
        }}
      />
    </PositionsWrapper>
  )
};

export default TestimonialsWrapper;
