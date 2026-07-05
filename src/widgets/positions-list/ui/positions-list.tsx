import { useEffect, type FC } from "react";
import { CreatePositionBtn } from "@/features/create-position-btn";
import { Loader } from "@/shared/ui";
import { ResetPositionsBtn } from "@/features/reset-positions-btn";
import { Wrapper } from "@/entities/wrapper";
import { useModalStore } from "@/shared/store";

const PositionsList: FC = ({
  aside,
  children,
  currData,
  footer,
  form,
  isLoading,
  setCurrData
}) => {
  const { isOpen, open } = useModalStore();

  const openCreatePositionForm = (currData) => { // : TPositionState["current"]
    if(!currData) return;

    open({ content: form });
  }

  const resetPositionData = (isOpen: boolean) => {
    if(isOpen) return;

    setCurrData(null);
  }

  useEffect(() => {
    openCreatePositionForm(currData);
  }, [currData]);

  useEffect(() => {
    resetPositionData(isOpen);
  }, [isOpen]);

  return (
    <Wrapper
      aside={aside}
      footer={footer}
      title="Все позиции"
    >
      <Loader hasCircle={false} isVisible={isLoading}>{children}</Loader>
    </Wrapper>
  )
};

export default PositionsList;
