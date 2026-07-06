import { useEffect } from "react";
import { useModalStore } from "@/shared/store";
import type { IUpdatePositionModal, TUpdatePositionModal } from "../model/types";

export const useUpdatePositionModal = <T extends { id: number }>(
  { content, setCurrData }: TUpdatePositionModal<T>
): IUpdatePositionModal<T> => {
  const { isOpen, open } = useModalStore();

  const showPositionForm = <T>(data: T) => {
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
    showPositionForm
  };
};
