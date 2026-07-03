import { StorageHandler } from "./storage-handler";
import { QUERY_KEY } from "../constants";
import type { TQueryData } from "../types";

export const sortPositions = async <T>(
  { sortby, ...payload }: { data: T[]; sortby: keyof T; }
): Promise<{ arr: T[]; data: TQueryData<keyof T> | null; }> => {
  const storageData = StorageHandler.getData<TQueryData<keyof T>>(QUERY_KEY);
  const { search, sortdir } = storageData || { sortdir: "DESC" };
  const currSortdir = sortdir === "DESC" ? "ASC" : "DESC";

  const { success, data } = await StorageHandler.handleData<TQueryData<keyof T>>({
    sortby,
    sortdir: storageData ? currSortdir : sortdir,
    ...( search && { search } )
  }, QUERY_KEY);

  if(!success || !data) {
    return {
      arr: payload.data,
      data
    };
  }

  const arr = [...payload.data].sort((a, b) => {
    const aValue = Number(a[sortby]);
    const bValue = Number(b[sortby]);

    return data.sortdir === "ASC" ? aValue - bValue : bValue - aValue;
  });

  return { arr, data };
}
