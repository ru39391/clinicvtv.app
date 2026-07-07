import { useEffect } from "react";
import { Loader } from "@/shared/ui";
import { Wrapper } from "@/entities/wrapper";
import { useUpdatePositionModal } from "../hooks/use-update-position-modal";
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
  const { showPositionForm } = useUpdatePositionModal<T>({
    content: form,
    setCurrData
  });

  useEffect(() => {
    showPositionForm(currData);
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
