import { useEffect, type FC } from "react";
import { CreatePositionBtn } from "@/features/create-position-btn";
import { CreatePriceItemForm } from "@/features/create-price-item-form";
import { ItemsCounter } from "@/entities/items-counter";
import { Loader } from "@/shared/ui";
import { Pagination } from "@/entities/pagination";
import { PriceList } from "@/features/price-list";
import { ResetPositionsBtn } from "@/features/reset-positions-btn";
import { Wrapper } from "@/entities/wrapper";
import { useModalStore } from "@/shared/store";
import { usePricelistStore, type TPositionState } from "@/entities/price";

const PriceListCounter: FC<Pick<TPositionState, "isLoading" | "pagination">> = ({ isLoading, pagination }) => (
  pagination ? <Loader isCircleHidden={isLoading} isVisible={isLoading}><ItemsCounter {...pagination} /></Loader> : ""
);

const PriceListPagination: FC<Pick<TPositionState, "fetchPricelist" | "isLoading" | "pagination">> = ({ fetchPricelist, isLoading, pagination }) => (
  pagination ? <Loader isCircleHidden={isLoading} isVisible={isLoading}><Pagination {...pagination} handleClick={fetchPricelist} /></Loader> : ""
);

const PriceListWrapper: FC = () => {
  const { isOpen, open } = useModalStore();
  const {
    current: position,
    fetchPricelist,
    isLoading,
    pagination,
    setCurrPriceData
  } = usePricelistStore();

  const openCreatePositionForm = (position: TPositionState["current"]) => {
    if(!position) return;

    open({ content: <CreatePriceItemForm /> });
  }

  const resetPositionData = (isOpen: boolean) => {
    if(isOpen) return;

    setCurrPriceData(null);
  }

  useEffect(() => {
    fetchPricelist(null);
  }, []);

  useEffect(() => {
    openCreatePositionForm(position);
  }, [position]);

  useEffect(() => {
    resetPositionData(isOpen);
  }, [isOpen]);

  return (
    <Wrapper
      aside={(
        <>
          <ResetPositionsBtn />
          <CreatePositionBtn><CreatePriceItemForm /></CreatePositionBtn>
        </>
      )}
      footer={(<>
        <PriceListCounter {...{ isLoading, pagination }} />
        <PriceListPagination {...{ fetchPricelist, isLoading, pagination }} />
      </>)}
      title="Все позиции"
    >
      <Loader hasCircle={false} isVisible={isLoading}><PriceList /></Loader>
    </Wrapper>
  )
};

export default PriceListWrapper;
