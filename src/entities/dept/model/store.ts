import { createStore } from "@/shared/store";
import { deptApi } from "../lib/dept-api";
import type { TDeptData } from "./types";

export const useDeptStore = createStore<null, TDeptData>({
  name: "DeptStore",
  api: deptApi
});
