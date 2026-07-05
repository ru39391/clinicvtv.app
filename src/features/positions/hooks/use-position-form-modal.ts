import { useEffect } from "react";
import { useModalStore } from "@/shared/store";
import type { IPositionFormModal, TPositionFormModal } from "../model/types";

export const usePositionFormModal = <T extends { id: number }>(
  { content, setCurrData }: TPositionFormModal<T>
): IPositionFormModal<T> => {
  const { isOpen, open } = useModalStore();

  const openCreatePositionForm = <T>(data: T) => {
    if(!data) return;

    open({ content });
  }

  const resetPositionData = (isOpen: boolean) => {
    if(isOpen) return;

    setCurrData(null);
  }

  useEffect(() => {
    resetPositionData(isOpen);
  }, [isOpen]);

  return {
    openCreatePositionForm
  };
};
