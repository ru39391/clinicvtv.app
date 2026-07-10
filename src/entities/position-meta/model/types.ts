import { type ReactNode } from "react";

export interface IPositionMeta {
  alt?: string;
  caption: string;
  children: ReactNode;
  isActive?: boolean;
  thumb?: string;
  type?: "row";
  onClick?: () => void;
}

export interface IPositionMetaWrapper {
  children: ReactNode;
  type?: "list";
}
