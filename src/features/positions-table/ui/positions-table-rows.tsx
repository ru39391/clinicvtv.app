import { TableCell } from "@/entities/table-cell";
import { IS_HIDDEN_KEY } from "@/shared/constants";
import { formatDate, setItemHiddenCaption } from "@/shared/utils";
import { type TPositionTableData } from "../model/types";
import { type TItemData } from "@/shared/types";

const PositionTableRows = <T extends TItemData, >({
  values,
  captions
}: { values: TPositionTableData<T>[]; captions: Record<keyof T, string>; }) => (
  values.map(
    ({ key, value }) => {
      const caption = key === IS_HIDDEN_KEY ? setItemHiddenCaption(value) : formatDate(value, key);

      return (
        <TableCell
          key={key}
          caption={captions[key]}
          type={key}
        >
          {caption}
        </TableCell>
      )
    }
  )
);

export default PositionTableRows;
