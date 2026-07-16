import type { ReactNode } from "react";

export interface IButton {
  caption?: ReactNode;
  children?: ReactNode;
  handleClick?: () => void;
  href?: string;
  isDisabled?: boolean;
  style?: "unstyled" | "icon" | "plain" | "row";
  target?: "_blank";
  type?: "button" | "submit";
}
