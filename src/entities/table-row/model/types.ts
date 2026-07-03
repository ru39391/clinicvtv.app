import type { ReactNode } from "react";

export interface ITableRow {
  children: ReactNode;
  type?: "examples" | "price" | "testimonials";
  isCaption?: boolean;
}
