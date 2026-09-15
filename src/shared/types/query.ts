import type { TPaginationData } from "./pagination";

export type TQueryData<T> = Partial<Pick<TPaginationData, "page" | "perPage"> & { search: string; sortby: keyof T; sortdir: "ASC" | "DESC" }> | null;
