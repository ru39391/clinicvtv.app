import type { ReactNode } from "react";
import type { TItemData, TQueryData } from "@/shared/types";
import type { ITableRow } from "@/entities/table-row";

export type TPositionTableData<T extends TItemData> = {
  key: keyof T;
  value: T[keyof T];
} & Partial<Record<string, 0 | 1>>;

export interface IPositionsTableHeader<T extends TItemData> {
  captions: Record<keyof T, string>;
  children: ReactNode;
  keys: (keyof T)[];
  sortData: TQueryData<T>;
  sortColValues: (key: keyof T) => Promise<void>;
  type: ITableRow["type"];
}

export interface IPositionsTable<T extends TItemData, R extends TPositionTableData<T>> {
  arr: T[];
  children: (values: R[]) => ReactNode;
  keys: IPositionsTableHeader<T>["keys"];
  type: IPositionsTableHeader<T>["type"];
  setCurrData: (id: T["id"]) => void;
  showRemoveModal: (data: Pick<T, "id" | "name">) => void;
}
