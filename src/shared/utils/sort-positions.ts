import { StorageHandler } from "./storage-handler";
import {
  CREATED_AT_KEY,
  NAME_KEY,
  PRICE_KEY,
  UPDATED_AT_KEY,
  QUERY_KEY
} from "../constants";
import type { TQueryData } from "../types";

export const sortPositions = async <T>(
  { sortby, ...payload }: { data: T[]; sortby: keyof T; },
  queryKey: string = QUERY_KEY
): Promise<{ arr: T[]; data: TQueryData<T>; }> => {
  const storageData = StorageHandler.getData<TQueryData<T>>(queryKey);
  const { search, sortdir } = storageData || { sortdir: "DESC" };
  const currSortdir = sortdir === "DESC" ? "ASC" : "DESC";

  const { success, data } = await StorageHandler.handleData<TQueryData<T>>({
    sortby,
    sortdir: storageData ? currSortdir : sortdir,
    ...( search && { search } )
  }, queryKey);

  if(!success || !data) {
    return {
      arr: payload.data,
      data
    };
  }

  const arr = [...payload.data].sort((a, b) => {
    const aValue = a[sortby];
    const bValue = b[sortby];
    const dir = data.sortdir === 'ASC' ? 1 : -1;
    const dateDir = dir * (new Date(String(aValue)).getTime() - new Date(String(bValue)).getTime());

    switch (sortby) {
      case CREATED_AT_KEY:
        return dateDir;
      case UPDATED_AT_KEY:
        return dateDir;
      case NAME_KEY:
        return dir * String(aValue).localeCompare(String(bValue), 'ru');
      case PRICE_KEY:
      default:
        return dir * (Number(aValue) - Number(bValue));
    }
  });

  return { arr, data };
}
