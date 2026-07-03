import { useEffect, type FC } from "react";
import { CreatePositionBtn } from "@/features/create-position-btn";
import { CreatePositionForm } from "@/features/create-position-form";
import { Loader } from "@/shared/ui";
import { PositionsCounter } from "@/features/positions-counter";

import { PriceList } from "@/features/price-list";

import { PositionsPagination } from "@/features/positions-pagination";
import { ResetPositionsBtn } from "@/features/reset-positions-btn";
import { Wrapper } from "@/entities/wrapper";
import { useModalStore } from "@/shared/store";
import { usePricelistStore, type TPositionState } from "@/entities/price";

const PositionsWrapper: FC = () => {
  const { isOpen, open } = useModalStore();
  const {
    current: position,
    fetchPricelist,
    isLoading,
    setCurrPriceData
  } = usePricelistStore();

  const openCreatePositionForm = (position: TPositionState["current"]) => {
    if(!position) return;

    open({ content: <CreatePositionForm /> });
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
          <CreatePositionBtn><CreatePositionForm /></CreatePositionBtn>
        </>
      )}
      footer={(<><PositionsCounter /><PositionsPagination /></>)}
      title="Все позиции"
    >
      <Loader hasCircle={false} isVisible={isLoading}><PriceList /></Loader>
    </Wrapper>
  )
};

export default PositionsWrapper;
