import { createPositionApi } from "@/shared/store";
import { routes } from "@/shared/constants";
import { EXAMPLE_PIC_KEY } from "@/shared/constants";
import type { TExamplePicApi, TExamplePicData } from "../model/types";

export const examplePictureApi: TExamplePicApi = createPositionApi<null, TExamplePicData>(routes.api[EXAMPLE_PIC_KEY], EXAMPLE_PIC_KEY);
