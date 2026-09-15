import { StorageHandler } from "@/shared/utils";
import { QUERY_KEY } from "@/shared/constants"
import type { TQueryData } from "@/shared/types";

const resetStorageData = (key: string): Promise<{ success: boolean; }> => {
  StorageHandler.removeData(key);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: !StorageHandler.isDataExist(key) })
    }, 200);
  });
};

export const resetPositions = async <T>(
  fetchItems: (data: TQueryData<T>) => Promise<void>,
  key: string = QUERY_KEY
) => {
  const { success } = await resetStorageData(key);

  if(!success) {
    return;
  }

  fetchItems(null);
}
