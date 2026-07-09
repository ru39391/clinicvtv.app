import type { TQueryData } from "@/shared/types";
import type { TPositionApi, TPositionState, TPositionStore } from "@/shared/store";

export type TExamplePicData = Record<"name" | "url" | "size_formatted" | "updatedAt" | "ext", string> & Record<"size" | "date" | "width" | "height", number>;

export type TExamplePicState = TPositionState<TExamplePicData>;

export type TExamplePicQueryData = TQueryData<Pick<TExamplePicData, "name" | "size" | "date">>;

export type TExamplePicStore = Pick<TPositionStore<null, TExamplePicData>, "fetchItems">;

export type TExamplePicApi = Pick<TPositionApi<null, TExamplePicData>, "fetchData">;
