import type { ReactNode } from "react";

export interface ICreatePositionBtn<T extends { id: number }> {
  children: ReactNode;
  setCurrData: (id: T["id"] | null) => void;
}
