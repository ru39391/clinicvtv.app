import type {
  TPaginationData,
  TPriceData,
  TPricePayload,
  TQueryData
} from "@/shared/types";

export type TPricelistState = {
  data: TPriceData[];
  current: TPriceData | null;
  pagination: TPaginationData | null;
  isLoading: boolean;
}

export type TPriceQueryData = TQueryData<keyof TPriceData>;

export type TPricelistStore = TPricelistState & {
  fetchPricelist: (data: TPriceQueryData) => Promise<void>;
  createPriceItem: (data: TPricePayload) => Promise<boolean>;
  updatePriceItem: (data: TPriceData) => Promise<boolean>;
  removePriceItem: (id: TPriceData["id"]) => Promise<boolean>;
  setCurrPriceData: (id: TPriceData["id"] | null) => void;
}

export type TPricelistApi = {
  fetchItems: (data: TPriceQueryData) => Promise<Omit<TPricelistState, "isLoading" | "current">>;
  addItem: ({ item, arr, pagination }: {
    item: TPricePayload;
    arr: TPriceData[];
    pagination: TPricelistState["pagination"];
  }) => Promise<Omit<TPricelistState, "isLoading" | "current"> & { success: boolean }>;
  updateItem: ({ item, arr }: {
    item: TPriceData;
    arr: TPriceData[];
  }) => Promise<Pick<TPricelistState, "data"> & { success: boolean }>;
  removeItem: ({ id, arr, pagination }: {
    id: TPriceData["id"];
    arr: TPriceData[];
    pagination: TPricelistState["pagination"];
  }) => Promise<Omit<TPricelistState, "isLoading" | "current"> & { success: boolean }>;
}
