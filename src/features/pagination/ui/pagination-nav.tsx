import { Loader } from "@/shared/ui";
import { Pagination } from "@/entities/pagination";
import type { IPaginationNav } from "../model/types";
import type { TQueryData } from "@/shared/types";

const PaginationNav = <T,>({
  fetchItems,
  isLoading,
  pagination
}: IPaginationNav<T>) => (
  pagination
    ? <Loader isCircleHidden={isLoading} isVisible={isLoading}>
        <Pagination
          {...pagination}
          handleClick={(data: TQueryData<T>) => fetchItems(data)}
        />
      </Loader>
    : ""
);

export default PaginationNav;
