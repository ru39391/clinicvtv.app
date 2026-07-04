import type { TPaginationData } from "@/shared/types";

export type TPositionState<T> = {
  data: T[];
  current: T | null;
  pagination: TPaginationData | null;
  isLoading: boolean;
}

export type TPositionResponse<T> = Omit<TPositionState<T>, "isLoading" | "current"> & { success: boolean };

export type TPositionStore<P, Q, S, T extends { id: number }> = S & {
  fetchItems: (data: Q) => Promise<void>;
  createItem: (data: P) => Promise<boolean>;
  updateItem: (data: T) => Promise<boolean>;
  removeItem: (id: T["id"]) => Promise<boolean>;
  setCurrItemData: (id: T["id"] | null) => void;
}

export type TPositionApi<P, Q, T> = {
  fetchData: (data: Q | null) => Promise<Omit<TPositionState<T>, "isLoading" | "current">>;
  addData: ({ item, arr, pagination }: {
    item: P;
    arr: T[];
    pagination: TPositionState<T>["pagination"];
  }) => Promise<TPositionResponse<T>>;
  updateData: ({ item, arr }: {
    item: T;
    arr: T[];
  }) => Promise<Pick<TPositionState<T>, "data"> & { success: boolean }>;
  removeData: ({ id, arr, pagination }: {
    id: number;
    arr: T[];
    pagination: TPositionState<T>["pagination"];
  }) => Promise<TPositionResponse<T>>;
}
