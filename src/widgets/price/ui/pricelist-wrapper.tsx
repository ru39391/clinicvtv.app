import { useEffect, type FC } from "react";
import { CreatePositionBtn } from "@/features/create-position-btn";
import { CreatePriceItemForm } from "@/features/create-price-item-form";
import { PaginationCounter, PaginationNav } from "@/features/pagination";
import { PositionsWrapper } from "@/features/positions";
import { RemovePositionModal } from "@/features/remove-position-modal";
import { ResetPositionsBtn } from "@/features/reset-positions-btn";
import { PriceList } from "@/features/price-list";
import { useModalStore } from "@/shared/store";
import { usePricelistStore, type TPricelistData, type TPricelistQueryData } from "@/entities/pricelist";

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
      <PriceList
        showRemoveModal={({ id, name }: Pick<TPricelistData, "id" | "name">) => open({
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
