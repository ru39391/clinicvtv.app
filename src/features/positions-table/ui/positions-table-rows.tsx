import { TableCell } from "@/entities/table-cell";
import { IS_HIDDEN_KEY } from "@/shared/constants";
import { formatDate, setItemHiddenCaption } from "@/shared/utils";
import { type TPositionTableData } from "../model/types";
import { type TItemData } from "@/shared/types";

const PositionTableRows = <T extends TItemData,>({
  values,
  captions
}: { values: TPositionTableData<T>[]; captions: Record<keyof T, string>; }) => (
  values.map(
    ({ key, value }) => {
      const type = String(key);
      const caption = key === IS_HIDDEN_KEY ? setItemHiddenCaption(Number(value)) : formatDate(String(value), type);

      return (
        <TableCell
          key={type}
          caption={captions[key]}
          type={type}
        >
          {caption}
        </TableCell>
      )
    }
  )
);

export default PositionTableRows;
