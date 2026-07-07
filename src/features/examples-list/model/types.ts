import { type TExampleData, type TExampleStore } from "@/entities/example";

export interface IExamplesList {
  arr: TExampleStore["data"];
  isLoading: TExampleStore["isLoading"];
  setCurrData: TExampleStore["setCurrItemData"]
  showRemoveModal: ({ id, name }: Pick<TExampleData, "id" | "name">) => void;
}

export interface IExampleRows {
  values: { key: keyof TExampleData; value: string; }[];
}
