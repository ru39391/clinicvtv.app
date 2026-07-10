import type { ReactNode } from "react";
import type { TExampleData } from "@/entities/example";
import type { TExamplePicStore, TExamplePicState } from "@/entities/example-picture";
import { IMG_BEFORE_KEY, IMG_AFTER_KEY } from "@/shared/constants";

export interface IExamplePicsPagination {
  fetchExamplePics: TExamplePicStore["fetchItems"];
  isPicsDataLoading: TExamplePicState["isLoading"];
  picsPagination: TExamplePicState["pagination"];
}

export interface ISelectExamplePicModal {
  data: TExampleData;
  isLoading: boolean;
  children: (props: IExamplePicsPagination) => ReactNode;
}

export interface ISelectExamplePic {
  currPicType: typeof IMG_BEFORE_KEY | typeof IMG_AFTER_KEY;
  currPicsData: Record<typeof IMG_BEFORE_KEY | typeof IMG_AFTER_KEY, string> | null;
  setCurrPicType: (key: typeof IMG_BEFORE_KEY | typeof IMG_AFTER_KEY) => void;
  handlePicsData: (data: Record<typeof IMG_BEFORE_KEY | typeof IMG_AFTER_KEY, string>) => void;
}
