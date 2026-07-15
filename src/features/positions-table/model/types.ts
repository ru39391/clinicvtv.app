import { DEPT_ID_KEY, IMG_AFTER_KEY, IS_MIN_VALUE_KEY, THUMB_KEY } from "@/shared/constants";
import type { ReactNode } from "react";
import type { TDeptData } from "@/entities/dept";
import type { TItemData, TQueryData } from "@/shared/types";
import type { ITableRow } from "@/entities/table-row";

export type TPositionTableData = TItemData & Partial<Record<typeof DEPT_ID_KEY, number> & Record<typeof IS_MIN_VALUE_KEY, 1 | 0> & Record<typeof IMG_AFTER_KEY, Record<typeof THUMB_KEY, string>>>;

export type TPositionTableOptions<T extends TItemData> = {
  key: keyof T;
  value: T[keyof T];
} & Partial<Record<string, 0 | 1> & Record<string, string>>;

export interface IPositionsTableHeader<T extends TItemData> {
  captions: Record<keyof T, string>;
  children: ReactNode;
  keys: (keyof T)[];
  sortData: TQueryData<T>;
  sortColValues: (key: keyof T) => Promise<void>;
  type: ITableRow["type"];
}

export interface IPositionsTable<T extends TItemData, R extends TPositionTableOptions<T>> {
  arr: T[];
  children: ({ data, values }: { data: T; values: R[]; }) => ReactNode;
  depts?: TDeptData[];
  keys: IPositionsTableHeader<T>["keys"];
  type: IPositionsTableHeader<T>["type"];
  setCurrData: (id: T["id"]) => void;
  showRemoveModal: (data: Pick<T, "id" | "name">) => void;
}
