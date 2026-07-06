import { useEffect, type FC } from "react";
import { CreatePositionBtn } from "@/features/create-position-btn";
import { CreatePriceItemForm } from "@/features/create-price-item-form";
import { PaginationCounter, PaginationNav } from "@/features/pagination";
import { PositionsWrapper } from "@/features/positions";
import { RemovePositionModal } from "@/features/remove-position-modal";
import { ResetPositionsBtn } from "@/features/reset-positions-btn";
import { PriceList } from "@/features/price-list";
import { useModalStore } from "@/shared/store";
import { type TItemData } from "@/shared/types";
import { usePricelistStore, type TPricelistData, type TPricelistQueryData } from "@/entities/pricelist";

const PricelistWrapper: FC = () => {
  const { open } = useModalStore();
  const {
    data: arr,
    current: currData,
    fetchItems,
    isLoading,
    pagination,
    removeItem,
    setCurrItemData: setCurrData
  } = usePricelistStore();

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
            <PaginationNav<TPricelistQueryData> {...{ fetchItems, isLoading, pagination }} />
          </>
        ),
        isLoading,
        setCurrData
      }}
    >
      <PriceList
        showRemoveModal={({ id, name }: Pick<TItemData, "id" | "name">) => open({
          content: <RemovePositionModal<TPricelistData> {...{ id, isLoading, name, removeItem }} />
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

export default PricelistWrapper;
