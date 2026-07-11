import { useEffect, type FC } from "react";
import { CreatePositionBtn } from "@/features/create-position-btn";
import { CreateExampleItemForm } from "@/features/create-example-item-form";
import { PaginationCounter, PaginationNav } from "@/features/pagination";
import { PositionsTable, PositionsTableHeader, PositionsTableRows, type TPositionTableOptions } from "@/features/positions-table";
import { PositionsWrapper } from "@/features/positions-wrapper";
import { RemovePositionModal } from "@/features/remove-position-modal";
import { ResetPositionsBtn } from "@/features/reset-positions-btn";
import { SelectExamplePicModal, type IExamplePicsPagination } from "@/features/select-example-pic-modal";
import { useModalStore } from "@/shared/store";
import { useExampleStore, type TExampleData } from "@/entities/example";
import { type TExamplePicData } from "@/entities/example-picture";
import {
  LIST_IS_EMPTY,
  EXAMPLE_CAPTIONS,
  EXAMPLE_KEY,
  NAME_KEY,
  DESC_KEY,
  INTRO_KEY,
  IS_HIDDEN_KEY,
  CREATED_AT_KEY,
  UPDATED_AT_KEY
} from "@/shared/constants";
import { useSortExamplesList } from "../hooks/use-sort-examples-list";

const ExamplePicsPagination: FC<IExamplePicsPagination> = ({
  fetchExamplePics: fetchItems,
  isPicsDataLoading: isLoading,
  picsPagination: pagination
}) => (
  <>
    <PaginationCounter {...{ isLoading, pagination }} />
    <PaginationNav<TExamplePicData> {...{ fetchItems, isLoading, pagination }} />
  </>
);

const ExamplesWrapper: FC = () => {
  const { open } = useModalStore();
  const { sortData, sortColValues } = useSortExamplesList();
  const {
    data: arr,
    current: currData,
    fetchItems,
    removeItem,
    setCurrItemData: setCurrData,
    isLoading,
    pagination,
  } = useExampleStore();
  const keys: (keyof TExampleData)[] = [
    NAME_KEY,
    DESC_KEY,
    IS_HIDDEN_KEY,
    INTRO_KEY,
    CREATED_AT_KEY,
    UPDATED_AT_KEY
  ];
  const captions = {...EXAMPLE_CAPTIONS as Record<keyof TExampleData, string>};

  useEffect(() => {
    fetchItems(null);
  }, []);

  return (
    <PositionsWrapper<TExampleData>
      {...{
        aside: (
          <>
            <ResetPositionsBtn<TExampleData> {...{ fetchItems, isLoading, type: EXAMPLE_KEY }} />
            <CreatePositionBtn<TExampleData> {...{ setCurrData }}>
              <CreateExampleItemForm />
            </CreatePositionBtn>
          </>
        ),
        currData,
        form: <CreateExampleItemForm />,
        footer: (
          <>
            <PaginationCounter {...{ isLoading, pagination }} />
            <PaginationNav<TExampleData> {...{ fetchItems, isLoading, pagination }} />
          </>
        ),
        isLoading,
        setCurrData
      }}
    >
      {!isLoading && !arr.length
        ? LIST_IS_EMPTY
        : <PositionsTableHeader<TExampleData>
            {...{
              captions,
              keys,
              sortData,
              sortColValues,
              type: EXAMPLE_KEY
            }}
          >
            <PositionsTable<TExampleData, TPositionTableOptions<TExampleData>>
              {...{
                arr,
                keys,
                type: EXAMPLE_KEY,
                setCurrData,
                showRemoveModal: ({ id, name }: Pick<TExampleData, "id" | "name">) => open({
                  content: <RemovePositionModal<TExampleData> {...{ id, isLoading, name, removeItem }} />
                })
              }}
            >
              {({ data, values }: { data: TExampleData; values: TPositionTableOptions<TExampleData>[]; }) => (
                <PositionsTableRows
                  {...{
                    captions,
                    values,
                    handleClick: () => open({
                      content: (
                        <SelectExamplePicModal {...{ data }}>
                          {(props: IExamplePicsPagination) => <ExamplePicsPagination {...props} />}
                        </SelectExamplePicModal>
                      ),
                      type: "lg"
                    })
                  }}
                />
              )}
            </PositionsTable>
          </PositionsTableHeader>
      }
    </PositionsWrapper>
  )
};

export default ExamplesWrapper;
