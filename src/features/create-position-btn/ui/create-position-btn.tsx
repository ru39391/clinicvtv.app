import type { ReactNode } from "react";
import { AddIcon } from "@/shared/icons";
import { Button } from "@/shared/ui";
import { useModalStore } from "@/shared/store";
import type { ICreatePositionBtn } from "../model/types";

const CreatePositionBtn = <T extends { id: number },>({
  children,
  setCurrData
}: ICreatePositionBtn<T>) => {
  const { open } = useModalStore();

  const openPositionModal = (content: ReactNode) => {
    setCurrData(null);
    open({ content });
  }

  return (
    <Button
      caption="Добавить"
      handleClick={() => openPositionModal(children)}
      style="row"
    >
      <AddIcon />
    </Button>
  );
};

export default CreatePositionBtn;
