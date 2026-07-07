import { type ReactNode } from "react";
import { type TItemData } from "@/shared/types";
import { type ITableRow } from "@/entities/table-row";

export type TPositionTableData<T extends TItemData> = {
  key: keyof T;
  value: string;
} & Partial<Record<string, 0 | 1>>;

export interface IPositionsTable<T extends TItemData> {
  arr: T[];
  children: (values: TPositionTableData<T>[]) => ReactNode;
  keys: (keyof T)[];
  type: ITableRow["type"];
  setCurrData: (id: T["id"]) => void;
  showRemoveModal: (data: Pick<T, "id" | "name">) => void;
}
