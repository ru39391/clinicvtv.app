import { useEffect, type FC } from "react";
import { CreatePositionBtn } from "@/features/create-position-btn";
import { CreatePriceItemForm } from "@/features/create-price-item-form";
import { PaginationCounter, PaginationNav } from "@/features/pagination";
import { PositionsTable, PositionsTableHeader, PositionsTableRows, type TPositionTableData } from "@/features/positions-table";
import { PositionsWrapper } from "@/features/positions-wrapper";
import { RemovePositionModal } from "@/features/remove-position-modal";
import { ResetPositionsBtn } from "@/features/reset-positions-btn";
import { useModalStore } from "@/shared/store";
import { usePricelistStore, type TPricelistData, type TPricelistQueryData } from "@/entities/pricelist";
import {
  LIST_IS_EMPTY,
  NAME_KEY,
  PRICE_KEY,
  DEPT_ID_KEY,
  IS_HIDDEN_KEY,
  CREATED_AT_KEY,
  UPDATED_AT_KEY,
  PRICE_CAPTIONS
} from "@/shared/constants";
import { useSortPriceList } from "../hooks/use-sort-price-list";

const PricelistWrapper: FC = () => {
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

  useEffect(() => {
    fetchItems(null);
  }, []);

  return (
    <PositionsWrapper<TPricelistData>
      {...{
        aside: (
          <>
            <ResetPositionsBtn<TPricelistQueryData> {...{ fetchItems, isLoading }} />
            <CreatePositionBtn<TPricelistData> {...{ setCurrData }}>
              <CreatePriceItemForm />
            </CreatePositionBtn>
          </>
        ),
        currData,
        form: <CreatePriceItemForm />,
        footer: (
          <>
            <PaginationCounter {...{ isLoading, pagination }} />
            <PaginationNav<TPricelistData> {...{ fetchItems, isLoading, pagination }} />
          </>
        ),
        isLoading,
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
              type: "price"
            }}
          >
            <PositionsTable<TPricelistData, TPositionTableData<TPricelistData>>
              {...{
                arr,
                keys,
                type: "price",
                setCurrData,
                showRemoveModal: ({ id, name }: Pick<TPricelistData, "id" | "name">) => open({
                  content: <RemovePositionModal<TPricelistData> {...{ id, isLoading, name, removeItem }} />
                })
              }}
            >
              {(values: TPositionTableData<TPricelistData>[]) => <PositionsTableRows {...{ captions, values }} />}
            </PositionsTable>
          </PositionsTableHeader>
      }
    </PositionsWrapper>
  )
};

export default PricelistWrapper;
