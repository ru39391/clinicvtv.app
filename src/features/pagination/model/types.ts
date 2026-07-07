import type { TPaginationData, TQueryData } from "@/shared/types";

export interface IPaginationCounter {
  isLoading: boolean;
  pagination: TPaginationData | null;
}

export interface IPaginationNav<T> extends IPaginationCounter {
  fetchItems: (data: TQueryData<T>) => Promise<void>;
}
