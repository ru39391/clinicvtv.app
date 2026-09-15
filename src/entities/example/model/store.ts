import { createStore } from "@/shared/store";
import { exampleApi } from "../lib/example-api";
import type { TExampleData, TExamplePayload } from "../model/types";

export const useExampleStore = createStore<TExamplePayload, TExampleData>({
  name: "ExampleStore",
  api: exampleApi
});
