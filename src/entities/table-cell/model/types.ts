import type { ReactNode } from "react";

export interface ITableCell {
  children: ReactNode;
  handleClick?: () => void;
  isCaption?: boolean;
  sortdir?: "ASC" | "DESC";
  sortby?: string;
  type: string;
}
