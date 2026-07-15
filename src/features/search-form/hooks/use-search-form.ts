import { useEffect, useState, type ChangeEvent } from "react";
import { StorageHandler } from "@/shared/utils";
import { useDebounce } from "@/shared/hooks";
import type { TQueryData } from "@/shared/types";
import type { ISearchForm, TSearchForm } from "../model/types";

export const useSearchForm = <T extends { id: number }>(
  { fetchItems, type }: Omit<TSearchForm<T>, "arr">
): ISearchForm => {
  const [searchValue, setSearchValue] = useState<ISearchForm["searchValue"]>('');

  const handleStorageData = (): TQueryData<T> => StorageHandler.getData<TQueryData<T>>(type);

  const updatePositionsList = () => {
    const queryData = handleStorageData();

    if(searchValue.length > 0) {
      return;
    } else {
      if(!queryData) return;
    }

    const queryParams = queryData
      ? Object.entries(queryData).reduce((acc: TQueryData<T>, [key, value]) => key === "search" ? acc : ({...acc, [key]: value}), {})
      : null;

    if(queryParams && Object.values(queryParams).length > 0) {
      StorageHandler.handleData<TQueryData<T>>(queryParams, type);
    } else {
      StorageHandler.removeData(type);
    }

    fetchItems(null);
  }

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    const queryData = handleStorageData();
    const payload = { search: query };

    await StorageHandler.handleData(queryData ? { ...queryData, ...payload } : payload, type);

    fetchItems(payload);
  };

  const debouncedSearch = useDebounce(handleSearch, 500);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const { value } = event.target as HTMLInputElement;

    setSearchValue(value);
    debouncedSearch(value);
  };

  const resetSearchValue = () => {
    const queryData = handleStorageData();

    if(queryData === null) setSearchValue("");
  };

  useEffect(() => {
    updatePositionsList();
  }, [searchValue]);

  return {
    handleChange,
    resetSearchValue,
    searchValue
  }
}
