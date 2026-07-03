import type { TPaginationData } from "./pagination";

export type TQueryData = Partial<Pick<TPaginationData, "page" | "perPage">> & { search?: string; } | null;
