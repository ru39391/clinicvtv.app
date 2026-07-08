import type { TQueryData } from "@/shared/types";

export interface IResetPositionsBtn<T> {
  fetchItems: (data: TQueryData<T>) => Promise<void>;
  isLoading: boolean;
}
