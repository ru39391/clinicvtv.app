import { type ReactNode } from "react";
import { type TPricelistData } from "@/entities/pricelist";

export interface IPriceList {
  captions: Record<keyof TPricelistData, string>;
  children: ReactNode;
  keys: (keyof TPricelistData)[];
}

export interface IPriceRows {
  captions: IPriceList["captions"];
  values: (Record<string, 1 | 0> & {
    key: keyof TPricelistData;
    value: string;
  })[];
}
