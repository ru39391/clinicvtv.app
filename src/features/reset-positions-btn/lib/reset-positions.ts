import { StorageHandler } from "@/shared/utils";
import { QUERY_KEY } from "@/shared/constants"

const resetStorageData = (key: string): Promise<{ success: boolean; }> => {
  StorageHandler.removeData(key);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: !StorageHandler.isDataExist(key) })
    }, 200);
  });
};
// TODO: проверить
export const resetPositions = async <T>(
  fetchItems: (data: T | null) => Promise<void>,
  key: string = QUERY_KEY
) => {
  const { success } = await resetStorageData(key);

  if(!success) {
    return;
  }

  fetchItems(null);
}
