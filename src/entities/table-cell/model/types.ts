import type { ReactNode } from "react";

export interface ITableCell {
  caption?: string;
  children: ReactNode;
  handleClick?: () => void;
  isCaption?: boolean;
  sortdir?: "ASC" | "DESC";
  sortby?: string;
  type: string;
}
