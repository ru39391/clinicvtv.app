import { useEffect, type FC } from "react";
import { CreatePositionBtn } from "@/features/create-position-btn";
import { CreateExampleItemForm } from "@/features/create-example-item-form";
import { DeptSelectField } from "@/features/dept-select-field";
import { PaginationCounter, PaginationNav } from "@/features/pagination";
import { PositionsTable, PositionsTableHeader, PositionsTableRows, type TPositionTableOptions } from "@/features/positions-table";
import { PositionsWrapper } from "@/features/positions-wrapper";
import { RemovePositionModal } from "@/features/remove-position-modal";
import { ResetPositionsBtn } from "@/features/reset-positions-btn";
import { SelectExamplePicModal, type IExamplePicsPagination } from "@/features/select-example-pic-modal";
import { SpecSelectField } from "@/features/spec-select-field";
import { useDeptStore } from "@/entities/dept";
import { useExampleStore, type TExampleData } from "@/entities/example";
import { useModalStore } from "@/shared/store";
import { type TExamplePicData } from "@/entities/example-picture";
import {
  LIST_IS_EMPTY,
  EXAMPLE_CAPTIONS,
  EXAMPLE_KEY,
  NAME_KEY,
  DESC_KEY,
  DEPT_ID_KEY,
  INTRO_KEY,
  IS_HIDDEN_KEY,
  CREATED_AT_KEY,
  SPEC_ID_KEY,
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
  const {
    data: depts,
    fetchItems: fetchDepts,
    isLoading: isDeptsLoading
  } = useDeptStore();
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
    DEPT_ID_KEY,
    IS_HIDDEN_KEY,
    INTRO_KEY,
    CREATED_AT_KEY,
    UPDATED_AT_KEY
  ];
  const captions = {...EXAMPLE_CAPTIONS as Record<keyof TExampleData, string>};

  const fetchData = async () => {
    await fetchDepts(null);
    fetchItems(null);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PositionsWrapper<TExampleData>
      {...{
        aside: (
          <>
            <ResetPositionsBtn<TExampleData> {...{ fetchItems, isLoading, type: EXAMPLE_KEY }} />
            <CreatePositionBtn<TExampleData> {...{ setCurrData }}>
              <CreateExampleItemForm>
                <SpecSelectField />
                <DeptSelectField
                  {...{
                    depts,
                    isLoading: isDeptsLoading
                  }}
                />
              </CreateExampleItemForm>
            </CreatePositionBtn>
          </>
        ),
        currData,
        form: (
          <CreateExampleItemForm>
            {currData && <>
              <SpecSelectField current={currData?.[SPEC_ID_KEY] || 0} />
              <DeptSelectField
                {...{
                  current: currData?.[DEPT_ID_KEY] || 0,
                  depts,
                  isLoading: isDeptsLoading
                }}
              />
            </>}
          </CreateExampleItemForm>
        ),
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
                depts,
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
