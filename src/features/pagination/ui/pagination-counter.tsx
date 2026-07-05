import { type FC } from "react";
import { Loader } from "@/shared/ui";
import { ItemsCounter } from "@/entities/items-counter";
import type { IPaginationCounter } from "../model/types";

const PaginationCounter: FC<IPaginationCounter> = ({ isLoading, pagination }) => (
  pagination ? <Loader isCircleHidden={isLoading} isVisible={isLoading}><ItemsCounter {...pagination} /></Loader> : ""
);

export default PaginationCounter;
