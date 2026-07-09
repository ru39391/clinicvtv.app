import type { TPaginationData, TQueryData } from "@/shared/types";

export type TPositionState<T> = {
  data: T[];
  current: T | null;
  pagination: TPaginationData | null;
  isLoading: boolean;
}

export type TPositionResponse<T> = Omit<TPositionState<T>, "isLoading" | "current"> & { success: boolean };

export type TPositionStore<P, T extends { id: number }> = TPositionState<T> & {
  fetchItems: (data: TQueryData<T> | null) => Promise<void>;
  createItem: (data: P) => Promise<boolean>;
  updateItem: (data: P & { id?: T["id"] }) => Promise<boolean>; // TODO: проверить
  removeItem: (id: T["id"]) => Promise<boolean>;
  setCurrItemData: (id: T["id"] | null) => void;
}

export type TPositionApi<P, T extends { id: number }> = {
  fetchData: (data: TQueryData<T> | null) => Promise<Omit<TPositionState<T>, "isLoading" | "current">>;
  addData: ({ item, arr, pagination }: {
    item: P;
    arr: T[];
    pagination: TPositionState<T>["pagination"];
  }) => Promise<TPositionResponse<T>>;
  updateData: ({ item, arr }: {
    item: P & { id?: T["id"] };
    arr: T[];
  }) => Promise<Pick<TPositionState<T>, "data"> & { success: boolean }>;
  removeData: ({ id, arr, pagination }: {
    id: number;
    arr: T[];
    pagination: TPositionState<T>["pagination"];
  }) => Promise<TPositionResponse<T>>;
}

export type TPositionStoreOptions<P, T extends { id: number }> = {
  name: string;
  api: TPositionApi<P, T>;
  initialState?: Partial<TPositionState<T>>;
}
