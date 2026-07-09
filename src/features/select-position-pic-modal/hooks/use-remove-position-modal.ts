import { useModalStore } from "@/shared/store";
import { useNotificationStore } from "@/shared/store";
import { REMOVE_POSITION_SUCCEED } from "@/shared/constants";
import type { TRemovePositionModal, TRemoveItemOptions } from "../model/types";

export const useRemovePositionModal = <T extends { id: number }>(): TRemovePositionModal<T> => {
  const { close: closeModal } = useModalStore();
  const { add: addNotification } = useNotificationStore();

  const handleRemoveItem = async ({ id, removeItem }: TRemoveItemOptions<T>) => {
    const success = await removeItem(id);

    if (!success) {
      return;
    }

    closeModal();
    addNotification({ title: REMOVE_POSITION_SUCCEED, type: "success" });
  };

  return {
    handleRemoveItem
  };
};
