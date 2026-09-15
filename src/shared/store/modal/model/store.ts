import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { TModalStore, TModal } from "./types";

const initialState: TModal = {
  content: "",
  type: null,
  isOpen: false,
};

export const useModalStore = create<TModalStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      open: (config) => {
        set({
          isOpen: true,
          ...(config && {
            content: config.content,
            ...(config.type && { type: config.type })
          }),
        });
      },

      close: () => set({ content: "", type: null, isOpen: false }),

      toggle: () => set({ isOpen: !get().isOpen }),

      updateContent: (content) => set({ content }),
    }),
    { name: "ModalStore" },
  ),
);
