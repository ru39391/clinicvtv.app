import { createStore } from "@/shared/store";
import { exampleApi } from "../lib/example-api";
import type { TExampleData, TExampleQueryData, TExamplePayload } from "../model/types";

export const useExampleStore = createStore<TExamplePayload, TExampleQueryData, TExampleData>({
  name: "ExampleStore",
  api: exampleApi
});
