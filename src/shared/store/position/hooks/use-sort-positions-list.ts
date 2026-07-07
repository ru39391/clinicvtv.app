import { useState } from "react";
import { sortPositions } from "@/shared/utils";
import { INTRO_KEY, SPEC_ID_KEY } from "@/shared/constants";
import { type TQueryData } from "@/shared/types";
import { type UseBoundStore, type StoreApi } from "zustand";
import { type TPositionStore } from "../model/types";

type TCurrentStore<P, T extends { id: number }> = UseBoundStore<StoreApi<TPositionStore<P, T>>>;

export const createSortPositionsList = <P, T extends { id: number }>(
  store: TCurrentStore<P, T>
) => {
  return () => {
    const [sortData, setSortData] = useState<TQueryData<T>>(null);

    const sortPositionsList = async (sortby: keyof T): Promise<TQueryData<T>> => {
      const state = store.getState();
      const positions = state.data;

      const { arr, data } = await sortPositions<T>({ data: positions, sortby });

      store.setState({ ...state, data: arr });

      return data;
    }

    const sortColValues = async (key: keyof T) => {
      const sortby: keyof T = key === INTRO_KEY ? SPEC_ID_KEY : key;
      const data = await sortPositionsList(sortby);

      setSortData(data);
    }

    return {
      sortData,
      sortColValues
    };
  }
};


