import { createStore } from "@/shared/store";
import { teamApi } from "../lib/team-api";
import type { TTeamData } from "../model/types";

export const useTeamStore = createStore<null, TTeamData>({
  name: "TeamStore",
  api: teamApi
});
