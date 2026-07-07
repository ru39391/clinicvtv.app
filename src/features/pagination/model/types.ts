import type { TPaginationData } from "@/shared/types";

export interface IPaginationCounter {
  isLoading: boolean;
  pagination: TPaginationData | null;
}

export interface IPaginationNav<T> extends IPaginationCounter {
  fetchItems: (data: T | null) => Promise<void>;
}
