import { useEffect, type FC } from "react";
import { CreatePositionBtn } from "@/features/create-position-btn";
import { CreatePriceItemForm } from "@/features/create-price-item-form";
import { PaginationCounter, PaginationNav } from "@/features/pagination";
import { PositionsWrapper } from "@/features/positions-wrapper";
import { RemovePositionModal } from "@/features/remove-position-modal";
import { ResetPositionsBtn } from "@/features/reset-positions-btn";
import { PriceRows, PriceList, type IPriceRows } from "@/features/price-list";
import { PositionsTable } from "@/features/positions-table";
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

const PricelistWrapper: FC = () => {
  const { open } = useModalStore();
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
        : <PriceList {...{ captions, keys }}>
            <PositionsTable<TPricelistData, IPriceRows["values"][number]>
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
              {(values: IPriceRows["values"]) => <PriceRows {...{ captions, values }} />}
            </PositionsTable>
          </PriceList>
      }
    </PositionsWrapper>
  )
};

export default PricelistWrapper;
