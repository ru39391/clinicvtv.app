import type { TPositionState } from "@/shared/types";

export interface IPaginationCounter {
  isLoading: TPositionState["isLoading"];
  pagination: TPositionState["pagination"];
}

export interface IPaginationNav<T> extends IPaginationCounter {
  fetchItems: (data: T | null) => Promise<void>;
}
