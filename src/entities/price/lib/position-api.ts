import { apiHandler } from "@/shared/api";
import { StorageHandler } from "@/shared/utils";
import { routes } from "@/shared/constants";
import { IS_HIDDEN_KEY, QUERY_KEY } from "@/shared/constants";
import type { TPricelistApi, TPriceQueryData } from "../model/types";
import type { TPaginationData, TPriceData, TPricePayload } from "@/shared/types";

// TODO: избавиться от лишнего кода
// import { createPositionApi } from "@/shared/store";
// export const pricelistActions: TPricelistActions = createPositionApi<TPricePayload, TPriceQueryData, TPriceData>(routes.api.price);

export const pricelistApi: TPricelistApi = {
  fetchItems: async (payload = null) => {
    const storageData = StorageHandler.getData<TPriceQueryData>(QUERY_KEY);
    const query = payload && storageData ? {...payload, ...storageData} : (payload || storageData);
    const url = `${routes.api.price}?${IS_HIDDEN_KEY}=all${query
      ? Object.entries(query).reduce(
        (acc, [key, value], index) => {
          const str = `&${key}=${value}`;

          return `${acc}${str}`;
        }
        , ""
      )
      : ""
    }`;
    const { data: { data, ...pagination } } = await apiHandler.fetch<TPaginationData & { data: TPriceData[]; }>(url);

    return Array.isArray(data) ? { data, pagination } : { data: [], pagination: null };
  },
  addItem: async ({ item, arr, pagination }) => {
    const { data } = await apiHandler.create<TPricePayload, TPriceData>(routes.api.price, item);
    const { success, ...position } = data as TPriceData & { success: boolean };

    return {
      data: success ? [position, ...arr] : arr,
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
  updateItem: async ({ item, arr }) => {
    const { data } = await apiHandler.update<TPriceData, TPriceData>(`${routes.api.price}/${item.id}`, item);
    const { success, ...position } = data as TPriceData & { success: boolean };

    return {
      data: success ? [...arr].map(data => data.id === position.id ? position : data) : arr,
      success
    };
  },
  removeItem: async ({ id, arr, pagination }) => {
    const { success } = await apiHandler.remove<null, { success: boolean; }>(`${routes.api.price}/${id}`);

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
}
