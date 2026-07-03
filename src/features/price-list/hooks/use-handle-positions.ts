import { useModalStore } from "@/shared/store";
import { useNotificationStore } from "@/shared/store";
import { usePricelistStore } from "@/entities/price";
import { REMOVE_POSITION_SUCCEED } from "@/shared/constants";
import type { THandlePositions } from "../model/types";
import type { TPriceData } from "@/shared/types";

export const useHandlePositions = (): THandlePositions => {
  const { close: closeModal } = useModalStore();
  const { add: addNotification } = useNotificationStore();
  const { removePriceItem } = usePricelistStore();

  const handleRemoveItem = async (id: TPriceData["id"]) => {
    const success = await removePriceItem(id);

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
