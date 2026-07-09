import type { ReactNode } from "react";

export type TModal = {
  content: ReactNode;
  type?: "sm" | "md" | "lg" | null;
  isOpen: boolean;
}

export type TModalStore = TModal & {
  open: (config: { content: ReactNode; type?: TModal["type"]; }) => void;
  close: () => void;
  toggle: () => void;
  updateContent: (content: ReactNode) => void;
}
