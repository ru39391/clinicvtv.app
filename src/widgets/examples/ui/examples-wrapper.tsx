import { useEffect, type FC } from "react";
import { CreatePositionBtn } from "@/features/create-position-btn";
import { CreateExampleItemForm } from "@/features/create-example-item-form";
import { PaginationCounter, PaginationNav } from "@/features/pagination";
import { PositionsTable, PositionsTableHeader, PositionsTableRows, type TPositionTableData } from "@/features/positions-table";
import { PositionsWrapper } from "@/features/positions-wrapper";
import { RemovePositionModal } from "@/features/remove-position-modal";
import { ResetPositionsBtn } from "@/features/reset-positions-btn";
import { useModalStore } from "@/shared/store";
import { useExampleStore, type TExampleData, type TExampleQueryData } from "@/entities/example";
import {
  LIST_IS_EMPTY,
  EXAMPLE_CAPTIONS,
  NAME_KEY,
  DESC_KEY,
  INTRO_KEY,
  IS_HIDDEN_KEY,
  CREATED_AT_KEY,
  UPDATED_AT_KEY
} from "@/shared/constants";
import { useSortExamplesList } from "../hooks/use-sort-examples-list";

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
            <ResetPositionsBtn<TExampleQueryData> {...{ fetchItems, isLoading }} />
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
              type: "example"
            }}
          >
            <PositionsTable<TExampleData, TPositionTableData<TExampleData>>
              {...{
                arr,
                keys,
                type: "example",
                setCurrData,
                showRemoveModal: ({ id, name }: Pick<TExampleData, "id" | "name">) => open({
                  content: <RemovePositionModal<TExampleData> {...{ id, isLoading, name, removeItem }} />
                })
              }}
            >
              {(values: TPositionTableData<TExampleData>[]) => <PositionsTableRows {...{ captions, values }} />}
            </PositionsTable>
          </PositionsTableHeader>
      }
    </PositionsWrapper>
  )
};

export default ExamplesWrapper;
