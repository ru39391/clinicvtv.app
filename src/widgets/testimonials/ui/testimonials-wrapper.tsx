import { useEffect, type FC } from "react";
import { CreatePositionBtn } from "@/features/create-position-btn";
import { CreateTestimonialItemForm } from "@/features/create-testimonial-item-form";
import { Heading } from "@/entities/heading";
import { GoBackBtn } from "@/features/go-back-btn";
import { Nav } from "@/features/nav";
import { PaginationCounter, PaginationNav } from "@/features/pagination";
import { PositionsTable, PositionsTableHeader, PositionsTableRows, type TPositionTableOptions } from "@/features/positions-table";
import { PositionsWrapper } from "@/features/positions-wrapper";
import { RemovePositionModal } from "@/features/remove-position-modal";
import { ResetPositionsBtn } from "@/features/reset-positions-btn";
import { SearchForm } from "@/features/search-form";
import { SpecSelectField } from "@/features/spec-select-field";
import { useModalStore } from "@/shared/store";
import { useTestimonialStore, type TTestimonialData } from "@/entities/testimonial";
import {
  LIST_IS_EMPTY,
  TESTIMONIAL_CAPTIONS,
  TESTIMONIAL_KEY,
  NAME_KEY,
  DESC_KEY,
  INTRO_KEY,
  RATING_KEY,
  IS_HIDDEN_KEY,
  CREATED_AT_KEY,
  SPEC_ID_KEY,
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
  const title = "Отзывы";

  useEffect(() => {
    document.title = title;

    fetchItems(null);
  }, []);

  return (<>
    <Heading {...{ aside: <GoBackBtn />, title }}>
      <SearchForm<TTestimonialData> {...{ arr, fetchItems, type: TESTIMONIAL_KEY }} />
    </Heading>
    <PositionsWrapper<TTestimonialData>
      {...{
        aside: (
          <>
            <ResetPositionsBtn<TTestimonialData> {...{ fetchItems, isLoading, type: TESTIMONIAL_KEY }} />
            <CreatePositionBtn<TTestimonialData> {...{ setCurrData }}>
              <CreateTestimonialItemForm><SpecSelectField /></CreateTestimonialItemForm>
            </CreatePositionBtn>
          </>
        ),
        currData,
        form: (
          <CreateTestimonialItemForm>
            {currData && <SpecSelectField current={currData?.[SPEC_ID_KEY] || 0} />}
          </CreateTestimonialItemForm>
        ),
        footer: (
          <>
            <PaginationCounter {...{ isLoading, pagination }} />
            <PaginationNav<TTestimonialData> {...{ fetchItems, isLoading, pagination }} />
          </>
        ),
        isLoading,
        nav: <Nav />,
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
              type: TESTIMONIAL_KEY
            }}
          >
            <PositionsTable<TTestimonialData, TPositionTableOptions<TTestimonialData>>
              {...{
                arr,
                keys,
                type: TESTIMONIAL_KEY,
                setCurrData,
                showRemoveModal: ({ id, name }: Pick<TTestimonialData, "id" | "name">) => open({
                  content: <RemovePositionModal<TTestimonialData> {...{ id, isLoading, name, removeItem }} />
                })
              }}
            >
              {({ values }: { values: TPositionTableOptions<TTestimonialData>[] }) => <PositionsTableRows {...{ captions, values }} />}
            </PositionsTable>
          </PositionsTableHeader>
      }
    </PositionsWrapper>
  </>)
};

export default TestimonialsWrapper;
