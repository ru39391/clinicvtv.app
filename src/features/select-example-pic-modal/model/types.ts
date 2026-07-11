import type { ReactNode } from "react";
import type { TExampleData } from "@/entities/example";
import type { TExamplePicStore, TExamplePicState } from "@/entities/example-picture";
import { IMG_AFTER_KEY, IMG_BEFORE_KEY } from "@/shared/constants";

export interface IExamplePicsPagination {
  fetchExamplePics: TExamplePicStore["fetchItems"];
  isPicsDataLoading: TExamplePicState["isLoading"];
  picsPagination: TExamplePicState["pagination"];
}

export interface ISelectExamplePicModal {
  children: (props: IExamplePicsPagination) => ReactNode;
  data: TExampleData;
}

export interface ISelectExamplePic {
  currPicType: typeof IMG_BEFORE_KEY | typeof IMG_AFTER_KEY;
  currPicsData: Record<typeof IMG_BEFORE_KEY | typeof IMG_AFTER_KEY, string> | null;
  isItemsLoading: boolean;
  setCurrPicType: (key: typeof IMG_BEFORE_KEY | typeof IMG_AFTER_KEY) => void;
  handlePicsData: (data: Record<typeof IMG_BEFORE_KEY | typeof IMG_AFTER_KEY, string>) => void;
  saveExampleData: (data: TExampleData) => Promise<void>;
}
