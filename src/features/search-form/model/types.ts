import type { ChangeEvent } from "react";
import type { TQueryData } from "@/shared/types";

export type TSearchForm<T extends { id: number }> = {
  fetchItems: (data: TQueryData<T>) => void;
  queryKey: string;
}

export interface ISearchForm {
  searchValue: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
