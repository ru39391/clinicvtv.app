import { createStore } from "@/shared/store";
import { examplePictureApi } from "../lib/example-picture-api";
import type { TExamplePicData } from "../model/types";

export const useExamplePicStore = createStore<null, TExamplePicData>({
  name: "ExamplePictureStore",
  api: examplePictureApi
});
