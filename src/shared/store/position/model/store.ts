import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { TPositionState, TPositionStore, TPositionStoreOptions } from "./types";

const createInitialState = <T>(): TPositionState<T> => ({
  data: [],
  current: null,
  pagination: null,
  isLoading: false,
});

export const createStore = <P, Q, T extends { id: number }>(options: TPositionStoreOptions<P, Q, T>) => {
  const { name, api, initialState = {} } = options;

  const defaultState = createInitialState<T>();
  const state: TPositionState<T> = { ...defaultState, ...initialState };

  return create<TPositionStore<P, Q, T>>()(
    devtools(
      (set, get): TPositionStore<P, Q, T> => ({
        ...state,

        fetchItems: async (payload = null) => {
          set({ isLoading: true });

          try {
            const { data, pagination } = await api.fetchData(payload);

            set({
              data,
              pagination,
              isLoading: false,
            });
          } finally {
            set({ isLoading: false });
          }
        },

        createItem: async (payload) => {
          set({ isLoading: true });

          try {
            const {
              data,
              pagination,
              success
            } = await api.addData({ item: payload, arr: get().data, pagination: get().pagination });

            set({
              data,
              pagination,
              isLoading: false,
            });

            return success;
          } finally {
            set({ isLoading: false });
          }
        },

        updateItem: async (payload) => {
          set({ isLoading: true });

          try {
            const { data, success } = await api.updateData({ item: payload, arr: get().data });

            set({
              data,
              isLoading: false,
            });

            return success;
          } finally {
            set({ isLoading: false });
          }
        },

        removeItem: async (id) => {
          set({ isLoading: true });

          try {
            const {
              data,
              pagination,
              success
            } = await api.removeData({ id, arr: get().data, pagination: get().pagination });

            set({
              data,
              pagination,
              isLoading: false,
            });

            return success;
          } finally {
            set({ isLoading: false });
          }
        },

        setCurrItemData: async (id = null) => {
          if(!id) {
            set({ current: null });
            return;
          }

          if(id === get().current?.id) {
            set({ current: null });
          }

          const current = [...get().data].find(item => Number(item.id) === Number(id));

          set({ current: current || null });
        },
      }),
      { name }
    )
  );
};
