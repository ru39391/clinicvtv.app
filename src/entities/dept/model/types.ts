import type { TQueryData } from "@/shared/types";
import type { TPositionApi, TPositionState, TPositionStore } from "@/shared/store";

export type TDeptData = Record<"pagetitle" | "desc" | "url", string> & Record<"id" | "menuindex", number>;

export type TDeptState = TPositionState<TDeptData>;

export type TDeptQueryData = TQueryData<Pick<TDeptData, "id" | "menuindex" | "pagetitle">>;

export type TDeptStore = TPositionStore<null, TDeptData>;

export type TDeptApi = TPositionApi<null, TDeptData>;
