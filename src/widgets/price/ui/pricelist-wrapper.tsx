import { useEffect, type FC } from "react";
import { CreatePositionBtn } from "@/features/create-position-btn";
import { CreatePriceItemForm } from "@/features/create-price-item-form";
import { DeptSelectField } from "@/features/dept-select-field";
import { Heading } from "@/entities/heading";
import { GoBackBtn } from "@/features/go-back-btn";
import { Nav } from "@/features/nav";
import { PaginationCounter, PaginationNav } from "@/features/pagination";
import { PositionsTable, PositionsTableHeader, PositionsTableRows, type TPositionTableOptions } from "@/features/positions-table";
import { PositionsWrapper } from "@/features/positions-wrapper";
import { RemovePositionModal } from "@/features/remove-position-modal";
import { ResetPositionsBtn } from "@/features/reset-positions-btn";
import { SearchForm } from "@/features/search-form";
import { useDeptStore } from "@/entities/dept";
import { useModalStore } from "@/shared/store";
import { usePricelistStore, type TPricelistData } from "@/entities/pricelist";
import {
  LIST_IS_EMPTY,
  NAME_KEY,
  DEPT_ID_KEY,
  IS_HIDDEN_KEY,
  CREATED_AT_KEY,
  UPDATED_AT_KEY,
  PRICE_CAPTIONS,
  PRICE_KEY
} from "@/shared/constants";
import { useSortPriceList } from "../hooks/use-sort-price-list";

const PricelistWrapper: FC = () => {
  const {
    data: depts,
    fetchItems: fetchDepts,
    isLoading: isDeptsLoading
  } = useDeptStore();
  const { open } = useModalStore();
  const { sortData, sortColValues } = useSortPriceList();
  const {
    data: arr,
    current: currData,
    fetchItems,
    removeItem,
    setCurrItemData: setCurrData,
    isLoading,
    pagination,
  } = usePricelistStore();
  const keys: (keyof TPricelistData)[] = [
    NAME_KEY,
    PRICE_KEY,
    DEPT_ID_KEY,
    IS_HIDDEN_KEY,
    CREATED_AT_KEY,
    UPDATED_AT_KEY
  ];
  const captions = {...PRICE_CAPTIONS as Record<keyof TPricelistData, string>};
  const title = "Прайслист";

  const fetchData = async () => {
    document.title = title;

    await fetchDepts(null);
    fetchItems(null);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (<>
    <Heading {...{ aside: <GoBackBtn />, title }}>
      <SearchForm<TPricelistData> {...{ arr, fetchItems, type: PRICE_KEY }} />
    </Heading>
    <PositionsWrapper<TPricelistData>
      {...{
        aside: (
          <>
            <ResetPositionsBtn<TPricelistData> {...{ fetchItems, isLoading, type: PRICE_KEY }} />
            <CreatePositionBtn<TPricelistData> {...{ setCurrData }}>
              <CreatePriceItemForm>
                <DeptSelectField
                  {...{
                    depts,
                    isLoading: isDeptsLoading
                  }}
                />
              </CreatePriceItemForm>
            </CreatePositionBtn>
          </>
        ),
        currData,
        form: (
          <CreatePriceItemForm>
            {currData && <DeptSelectField
              {...{
                current: currData?.[DEPT_ID_KEY] || 0,
                depts,
                isLoading: isDeptsLoading
              }}
            />}
          </CreatePriceItemForm>
        ),
        footer: (
          <>
            <PaginationCounter {...{ isLoading, pagination }} />
            <PaginationNav<TPricelistData> {...{ fetchItems, isLoading, pagination }} />
          </>
        ),
        isLoading,
        nav: <Nav />,
        setCurrData
      }}
    >
      {!isLoading && !arr.length
        ? LIST_IS_EMPTY
        : <PositionsTableHeader<TPricelistData>
            {...{
              captions,
              keys,
              sortData,
              sortColValues,
              type: PRICE_KEY
            }}
          >
            <PositionsTable<TPricelistData, TPositionTableOptions<TPricelistData>>
              {...{
                arr,
                depts,
                keys,
                type: PRICE_KEY,
                setCurrData,
                showRemoveModal: ({ id, name }: Pick<TPricelistData, "id" | "name">) => open({
                  content: <RemovePositionModal<TPricelistData> {...{ id, isLoading, name, removeItem }} />
                })
              }}
            >
              {({ values }: { values: TPositionTableOptions<TPricelistData>[] }) => <PositionsTableRows {...{ captions, values }} />}
            </PositionsTable>
          </PositionsTableHeader>
      }
    </PositionsWrapper>
  </>)
};

export default PricelistWrapper;
