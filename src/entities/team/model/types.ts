import type { TQueryData } from "@/shared/types";
import type { TPositionApi, TPositionState, TPositionStore } from "@/shared/store";

export type TTeamData = Record<"depts" | "pagetitle" | "introtext" | "url", string> & Record<"id" | "menuindex", number> & { depts_id: number[]; pics: Record<"thumb" | "webp", string>; };

export type TTeamState = TPositionState<TTeamData>;

export type TTeamQueryData = TQueryData<Pick<TTeamData, "id" | "menuindex" | "pagetitle">>;

export type TTeamStore = TPositionStore<null, TTeamData>;

export type TTeamApi = TPositionApi<null, TTeamData>;
