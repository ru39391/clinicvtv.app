import { createSortPositionsList } from "@/shared/store";
import { useExampleStore, type TExamplePayload, type TExampleData } from "@/entities/example";
import { EXAMPLE_KEY } from "@/shared/constants"

export const useSortExamplesList = createSortPositionsList<TExamplePayload, TExampleData>(useExampleStore, EXAMPLE_KEY);
