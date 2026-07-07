import { useEffect, type FC } from "react";
import { CreatePositionBtn } from "@/features/create-position-btn";
import { CreateTestimonialItemForm } from "@/features/create-testimonial-item-form";
import { PaginationCounter, PaginationNav } from "@/features/pagination";
import { PositionsWrapper } from "@/features/positions-wrapper";
import { RemovePositionModal } from "@/features/remove-position-modal";
import { ResetPositionsBtn } from "@/features/reset-positions-btn";
import { PositionsTable, PositionsTableHeader, PositionsTableRows, type TPositionTableData } from "@/features/positions-table";
import { useModalStore } from "@/shared/store";
import { useTestimonialStore, type TTestimonialData, type TTestimonialQueryData } from "@/entities/testimonial";
import {
  LIST_IS_EMPTY,
  TESTIMONIAL_CAPTIONS,
  NAME_KEY,
  DESC_KEY,
  INTRO_KEY,
  RATING_KEY,
  IS_HIDDEN_KEY,
  CREATED_AT_KEY,
  UPDATED_AT_KEY
} from "@/shared/constants";
import { useSortTestimonialsList } from "../hooks/use-sort-testimonials-list";

const TestimonialsWrapper: FC = () => {
  const { open } = useModalStore();
  const { sortData, sortColValues } = useSortTestimonialsList();
  const {
    data: arr,
    current: currData,
    fetchItems,
    removeItem,
    setCurrItemData: setCurrData,
    isLoading,
    pagination,
  } = useTestimonialStore();
  const keys: (keyof TTestimonialData)[] = [
    NAME_KEY,
    DESC_KEY,
    IS_HIDDEN_KEY,
    RATING_KEY,
    INTRO_KEY,
    CREATED_AT_KEY,
    UPDATED_AT_KEY
  ];
  const captions = {...TESTIMONIAL_CAPTIONS as Record<keyof TTestimonialData, string>};

  useEffect(() => {
    fetchItems(null);
    return () => {
      console.log('Компонент размонтирован');
    };
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
            <PaginationNav<TTestimonialData> {...{ fetchItems, isLoading, pagination }} />
          </>
        ),
        isLoading,
        setCurrData
      }}
    >
      {!isLoading && !arr.length
        ? LIST_IS_EMPTY
        : <PositionsTableHeader<TTestimonialData>
            {...{
              captions,
              keys,
              sortData,
              sortColValues,
              type: "testimonial"
            }}
          >
            <PositionsTable<TTestimonialData, TPositionTableData<TTestimonialData>>
              {...{
                arr,
                keys,
                type: "testimonial",
                setCurrData,
                showRemoveModal: ({ id, name }: Pick<TTestimonialData, "id" | "name">) => open({
                  content: <RemovePositionModal<TTestimonialData> {...{ id, isLoading, name, removeItem }} />
                })
              }}
            >
              {(values: TPositionTableData<TTestimonialData>[]) => <PositionsTableRows {...{ captions, values }} />}
            </PositionsTable>
          </PositionsTableHeader>
      }
    </PositionsWrapper>
  )
};

export default TestimonialsWrapper;
