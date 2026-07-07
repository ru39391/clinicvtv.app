import { createSortPositionsList } from "@/shared/store";
import { useExampleStore, type TExamplePayload, type TExampleData } from "@/entities/example";

export const useSortExamplesList = createSortPositionsList<TExamplePayload, TExampleData>(useExampleStore);
