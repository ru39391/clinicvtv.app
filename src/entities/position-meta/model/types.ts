import { type ReactNode } from "react";

export interface IPositionMeta {
  caption: string;
  thumb?: string;
  type?: "col";
  onClick?: () => void;
}

export interface IPositionMetaWrapper {
  children: ReactNode;
  type?: "list";
}
