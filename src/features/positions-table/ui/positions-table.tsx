import { Button } from "@/shared/ui";
import { EditIcon, TrashBinIcon } from "@/shared/icons";
import { TableCell } from "@/entities/table-cell";
import { TableRow } from "@/entities/table-row";
import { IS_MIN_VALUE_KEY } from "@/shared/constants";
import { type TItemData } from "@/shared/types";
import { type IPositionsTable, type TPositionTableData } from "../model/types";

const PositionsTable = <T extends TItemData, >({
  arr,
  children,
  keys,
  type,
  setCurrData,
  showRemoveModal
}: IPositionsTable<T>) => (
  arr.map((data: T) => {
    const values = keys.reduce(
      (acc: TPositionTableData<T>[], key: keyof T) => ([
        ...acc,
        {
          key,
          value: String(data[key]),
          ...(data[IS_MIN_VALUE_KEY] !== undefined && { [IS_MIN_VALUE_KEY as string]: data[IS_MIN_VALUE_KEY] })
        } as TPositionTableData<T>
      ]),
      []
    );

    return (
      <TableRow key={data.id.toString()} type={type}>
        {children(values)}
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
