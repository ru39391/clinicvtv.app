import { apiHandler } from "@/shared/api";
import { createPositionApi } from "@/shared/store";
import { routes } from "@/shared/constants";
import { IS_HIDDEN_KEY } from "@/shared/constants";
import type { TDeptApi, TDeptData } from "../model/types";

export const deptApi: TDeptApi = {
  ...createPositionApi<null, TDeptData>(routes.api.dept, "dept"),
  fetchData: async (payload = null) => {
    const queryParams = payload ? Object.entries(payload).reduce((acc, [key, value]) => `${acc}&${key}=${String(value)}`, "") : "";
    const url = `${routes.api.dept}?${IS_HIDDEN_KEY}=all${queryParams}`;
    const { data } = await apiHandler.fetch<TDeptData>(url);

    return { data: Array.isArray(data) ? data : [], pagination: null };
  },
};
