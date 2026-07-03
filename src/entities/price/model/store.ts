import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { pricelistApi } from "../lib/position-api";
import type { TPricelistState, TPricelistStore } from "./types";

const initialState: TPricelistState = {
  data: [],
  current: null,
  pagination: null,
  isLoading: false,
};

export const usePricelistStore = create<TPricelistStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      fetchPricelist: async (payload = null) => {
        set({ isLoading: true });

        try {
          const { data, pagination } = await pricelistApi.fetchItems(payload);

          set({
            data,
            pagination,
            isLoading: false,
          });
        } finally {
          set({ isLoading: false });
        }
      },
      createPriceItem: async (payload) => {
        let isSucceed = false;

        set({ isLoading: true });

        try {
          const {
            data,
            pagination,
            success
          } = await pricelistApi.addItem({ item: payload, arr: get().data, pagination: get().pagination });

          isSucceed = success;
          set({
            data,
            pagination,
            isLoading: false,
          });
        } finally {
          set({ isLoading: false });
        }

        return isSucceed;
      },
      updatePriceItem: async (payload) => {
        let isSucceed = false;

        set({ isLoading: true });

        try {
          const { data, success } = await pricelistApi.updateItem({ item: payload, arr: get().data });

          isSucceed = success;
          set({
            data,
            isLoading: false,
          });
        } finally {
          set({ isLoading: false });
        }

        return isSucceed;
      },
      removePriceItem: async (id) => {
        let isSucceed = false;

        set({ isLoading: true });

        try {
          const {
            data,
            pagination,
            success
          } = await pricelistApi.removeItem({ id, arr: get().data, pagination: get().pagination });

          isSucceed = success;
          set({
            data,
            pagination,
            isLoading: false,
          });
        } finally {
          set({ isLoading: false });
        }

        return isSucceed;
      },
      setCurrPriceData: async (id = null) => {
        if(!id) {
          set({ current: null });
          return;
        }

        if(id === get().current?.id) {
          set({ current: null });
        }

        const current = [...get().data].find(item => Number(item.id) === Number(id));

        set({ current: current || null });
      }
    }),
    { name: "PricelistStore" },
  ),
);
