import type { ReactNode } from "react";

export interface ITableRow {
  children: ReactNode;
  type: "caption" | null;
}
