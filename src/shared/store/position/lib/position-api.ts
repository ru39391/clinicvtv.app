import { apiHandler } from "@/shared/api";
import { StorageHandler } from "@/shared/utils";
import { IS_HIDDEN_KEY, QUERY_KEY } from "@/shared/constants";
import type { TPaginationData } from "@/shared/types";
import type { TPositionApi } from "../model/types";

export const createPositionApi = <P, Q, T extends { id: number }>(
  apiUrl: string
): TPositionApi<P, Q, T> => ({
  fetchData: async (payload = null) => {
    const storageData = StorageHandler.getData<Q>(QUERY_KEY);
    const query = payload && storageData ? {...payload, ...storageData} : (payload || storageData);
    const queryParams = query ? Object.entries(query).reduce((acc, [key, value]) => `${acc}&${key}=${value}`, "") : "";
    const url = `${apiUrl}?${IS_HIDDEN_KEY}=all${queryParams}`;
    const { data: { data, ...pagination } } = await apiHandler.fetch<TPaginationData & { data: T[]; }>(url);

    return Array.isArray(data) ? { data, pagination } : { data: [], pagination: null };
  },
  addData: async ({ item, arr, pagination }) => {
    const { data } = await apiHandler.create<P, T & { success: boolean }>(apiUrl, item);
    const { success, ...position } = data;

    return {
      data: success ? [position, ...arr] as T[] : arr,
      pagination: pagination
        ? {
          ...pagination,
          perPage: success ? pagination.perPage + 1 : pagination.perPage,
          totalCount: success ? pagination.totalCount + 1 : pagination.totalCount
        }
        : pagination,
      success
    };
  },
  updateData: async ({ item, arr }) => {
    const { data } = await apiHandler.update<T, T & { success: boolean }>(`${apiUrl}/${item.id}`, item);
    const { success, ...position } = data;

    return {
      data: success ? [...arr].map(data => data.id === position.id ? position : data) as T[] : arr,
      success
    };
  },
  removeData: async ({ id, arr, pagination }) => {
    const { success } = await apiHandler.remove<null, { success: boolean; }>(`${apiUrl}/${id}`);

    return {
      data: success ? [...arr].filter(item => Number(item.id) !== Number(id)) : arr,
      pagination: pagination
      ? {
          ...pagination,
          perPage: success ? pagination.perPage - 1 : pagination.perPage,
          totalCount: success ? pagination.totalCount - 1 : pagination.totalCount
        }
      : pagination,
      success
    };
  },
});
