import { useEffect } from "react";
import { Loader } from "@/shared/ui";
import { Wrapper } from "@/entities/wrapper";
import { usePositionFormModal } from "../hooks/use-position-form-modal";
import type { IPositionsWrapper } from "../model/types";

const PositionsWrapper = <T extends { id: number }, >({
  aside,
  children,
  currData,
  footer,
  form,
  isLoading,
  setCurrData
}: IPositionsWrapper<T>) => {
  const { openCreatePositionForm } = usePositionFormModal<T>({
    content: form,
    setCurrData
  });

  useEffect(() => {
    openCreatePositionForm(currData);
  }, [currData]);

  return (
    <Wrapper
      {...{
        aside,
        footer,
        title: "Все позиции"
      }}
    >
      <Loader
        hasCircle={false}
        isVisible={isLoading}
      >
        {children}
      </Loader>
    </Wrapper>
  )
};

export default PositionsWrapper;
