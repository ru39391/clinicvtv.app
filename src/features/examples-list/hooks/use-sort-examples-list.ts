import { useState } from "react";
import { sortPositions } from "@/shared/utils";
import { useExampleStore, type TExampleData, type TExampleQueryData } from "@/entities/example";
import { INTRO_KEY, SPEC_ID_KEY } from "@/shared/constants";

export const useSortExamplesList = () => {
  const [sortData, setSortData] = useState<TExampleQueryData | null>(null);

  const sortExamples = async (sortby: TExampleQueryData["sortby"]): Promise<TExampleQueryData | null> => {
    const { data: examples } = useExampleStore.getState();

    const { arr, data } = await sortPositions<TExampleData>({ data: examples, sortby });

    useExampleStore.setState({ data: arr });

    return data;
  }

  const sortColValues = async (key: keyof TExampleData) => {
    const sortby = key === INTRO_KEY ? SPEC_ID_KEY : key;
    const data = await sortExamples(sortby as TExampleQueryData["sortby"]);

    setSortData(data);
  }

  return {
    sortData,
    sortColValues
  };
};
