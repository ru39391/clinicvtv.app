import { Loader } from "@/shared/ui";
import { Pagination } from "@/entities/pagination";
import type { IPaginationNav } from "../model/types";

const PaginationNav = <T, >({ fetchItems, isLoading, pagination }: IPaginationNav<T>) => (
  pagination ? <Loader isCircleHidden={isLoading} isVisible={isLoading}><Pagination {...pagination} handleClick={fetchItems} /></Loader> : ""
);

export default PaginationNav;
