import type { ReactNode } from "react";
import { EXAMPLE_KEY, PRICE_KEY, TESTIMONIAL_KEY } from "@/shared/constants";

export interface ITableRow {
  children: ReactNode;
  type?: typeof EXAMPLE_KEY | typeof PRICE_KEY | typeof TESTIMONIAL_KEY;
  isCaption?: boolean;
}
