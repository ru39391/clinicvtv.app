import type { TQueryData } from "@/shared/types";
import type { TPositionApi, TPositionState, TPositionStore } from "@/shared/store";

export type TExamplePicData = Record<"name" | "url" | "size_formatted" | "updatedAt" | "ext", string> & Record<"id" | "size" | "date" | "width" | "height", number>;

export type TExamplePicState = TPositionState<TExamplePicData>;

export type TExamplePicQueryData = TQueryData<Pick<TExamplePicData, "name" | "size" | "date">>;

export type TExamplePicStore = TPositionStore<null, TExamplePicData>;

export type TExamplePicApi = TPositionApi<null, TExamplePicData>;
