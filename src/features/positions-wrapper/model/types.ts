import type { ReactNode } from "react";

export type TUpdatePositionModal<T extends { id: number }> = {
  content: ReactNode;
  setCurrData: (data: T["id"] | null) => void;
}

export interface IUpdatePositionModal<T> {
  showPositionForm: (data: T | null) => void;
}

export interface IPositionsWrapper<T extends { id: number }> {
  aside: ReactNode;
  children: ReactNode;
  currData: T | null;
  footer: ReactNode;
  form: ReactNode;
  isLoading: boolean;
  nav?: ReactNode;
  setCurrData: (data: T["id"] | null) => void;
}
