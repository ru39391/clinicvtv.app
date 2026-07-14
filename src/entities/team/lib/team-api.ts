import { apiHandler } from "@/shared/api";
import { createPositionApi } from "@/shared/store";
import { routes } from "@/shared/constants";
import { IS_HIDDEN_KEY } from "@/shared/constants";
import type { TTeamApi, TTeamData } from "../model/types";

export const teamApi: TTeamApi = {
  ...createPositionApi<null, TTeamData>(routes.api.team, "team"),
  fetchData: async (payload = null) => {
    const queryParams = payload ? Object.entries(payload).reduce((acc, [key, value]) => `${acc}&${key}=${String(value)}`, "") : "";
    const url = `${routes.api.team}?${IS_HIDDEN_KEY}=all${queryParams}`;
    const { data } = await apiHandler.fetch<TTeamData>(url);

    return { data: Array.isArray(data) ? data : [], pagination: null };
  },
};
