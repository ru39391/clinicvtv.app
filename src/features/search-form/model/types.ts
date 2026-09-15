import type { ChangeEvent } from "react";
import type { TQueryData } from "@/shared/types";

export type TSearchForm<T extends { id: number }> = {
  arr: T[];
  fetchItems: (data: TQueryData<T>) => void;
  type: string;
}

export interface ISearchForm {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  resetSearchValue: () => void;
  searchValue: string;
}
