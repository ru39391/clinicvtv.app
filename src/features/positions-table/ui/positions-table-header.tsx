import { Table } from "@/entities/table";
import { TableCell } from "@/entities/table-cell";
import { TableRow } from "@/entities/table-row";
import { DESC_KEY } from "@/shared/constants";
import { type TItemData } from "@/shared/types";
import { type IPositionsTableHeader } from "../model/types";

const PositionsTableHeader = <T extends TItemData,>({
  captions,
  children,
  keys,
  sortData,
  sortColValues,
  type
}: IPositionsTableHeader<T>) => (
  <Table>
    <TableRow {...{ isCaption: true, type }}>
      {keys.map((key) => (
        key !== DESC_KEY && <TableCell
          key={String(key)}
          isCaption={true}
          handleClick={() => sortColValues(key)}
          type={String(key)}
          {...(sortData && {
            sortby: String(sortData.sortby),
            sortdir: sortData.sortdir
          })}
        >
          {captions[key]}
        </TableCell>
      ))}
    </TableRow>
    {children}
  </Table>
);

export default PositionsTableHeader;
