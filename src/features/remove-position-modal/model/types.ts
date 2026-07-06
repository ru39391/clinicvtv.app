import type { TItemData } from "@/shared/types";

export type TRemoveItemOptions<T extends { id: number }> = Pick<TItemData, "id"> & {
  removeItem: (id: T["id"]) => Promise<{ success: boolean }>;
}

export type TRemovePositionModal<T extends { id: number }> = {
  handleRemoveItem: (data: TRemoveItemOptions<T>) => Promise<void>;
}

export interface IRemovePositionModal<T extends { id: number }> {
  id: TItemData["id"];
  name: TItemData["name"];
  isLoading: boolean;
  removeItem: TRemoveItemOptions<T>["removeItem"];
}
