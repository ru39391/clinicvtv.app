import { TableCell } from "@/entities/table-cell";
import { IS_HIDDEN_KEY, IS_MIN_VALUE_KEY, PRICE_KEY } from "@/shared/constants";
import { formatCurrency, formatDate, setItemHiddenCaption } from "@/shared/utils";
import { type TPositionTableData } from "../model/types";
import { type TItemData } from "@/shared/types";

const PositionTableRows = <T extends TItemData,>({
  values,
  captions
}: { values: TPositionTableData<T>[]; captions: Record<keyof T, string>; }) => (
  values.map(
    ({ key, value, ...data }) => {
      const type = String(key);
      const str = String(value);
      const caption = key === IS_HIDDEN_KEY ? setItemHiddenCaption(Number(value)) : formatDate(str, type);
      const priceValue = `${data[IS_MIN_VALUE_KEY] === 1 ? 'от ' : ''}${formatCurrency(str)}`;

      return (
        <TableCell
          key={type}
          caption={captions[key]}
          type={type}
        >
          {key === PRICE_KEY ? priceValue : caption}
        </TableCell>
      )
    }
  )
);

export default PositionTableRows;
