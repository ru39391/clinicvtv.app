import type { ReactNode } from "react";

export interface ITableRow {
  children: ReactNode;
  type?: "example" | "price" | "testimonial";
  isCaption?: boolean;
}
