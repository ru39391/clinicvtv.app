import { ReactNode } from "react";

export type TPositionFormModal<T extends { id: number }> = {
  content: ReactNode;
  setCurrData: (data: T["id"] | null) => void;
}

export interface IPositionFormModal<T> {
  openCreatePositionForm: (data: T | null) => void;
}

export interface IPositionsWrapper<T extends { id: number }> {
  aside: ReactNode;
  children: ReactNode;
  currData: T | null;
  footer: ReactNode;
  form: ReactNode;
  isLoading: boolean;
  setCurrData: (data: T["id"] | null) => void;
}
