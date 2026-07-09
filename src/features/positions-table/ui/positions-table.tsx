import { Button } from "@/shared/ui";
import { EditIcon, TrashBinIcon } from "@/shared/icons";
import { TableCell } from "@/entities/table-cell";
import { TableRow } from "@/entities/table-row";
import { IMG_AFTER_KEY, IS_MIN_VALUE_KEY, THUMB_KEY } from "@/shared/constants";
import type { IPositionsTable, TPositionTableData, TPositionTableOptions } from "../model/types";

const PositionsTable = <T extends TPositionTableData, R extends TPositionTableOptions<T>>({
  arr,
  children,
  keys,
  type,
  setCurrData,
  showRemoveModal
}: IPositionsTable<T, R>) => (
  arr.map((data: T) => {
    const values = keys.reduce(
      (acc: R[], key: keyof T) => ([
        ...acc,
        {
          key,
          value: String(data[key]),
          ...(data[IMG_AFTER_KEY] !== undefined && { [THUMB_KEY as string]: data[IMG_AFTER_KEY][THUMB_KEY] }),
          ...(data[IS_MIN_VALUE_KEY] !== undefined && { [IS_MIN_VALUE_KEY as string]: data[IS_MIN_VALUE_KEY] })
        } as R
      ]),
      []
    );

    return (
      <TableRow key={data.id.toString()} type={type}>
        {children({ id: data.id, values })}
        <TableCell type="btns">
          <Button
            handleClick={() => setCurrData(data.id)}
            style="icon"
          >
            <EditIcon />
          </Button>
          <Button
            handleClick={() => showRemoveModal({ id: data.id, name: data.name })}
            style="unstyled"
          >
            <TrashBinIcon />
          </Button>
        </TableCell>
      </TableRow>
    )
  })
);

export default PositionsTable;
