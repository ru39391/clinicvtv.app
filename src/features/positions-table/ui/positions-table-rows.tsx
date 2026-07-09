import { PositionMeta } from "@/entities/position-meta";
import { TableCell } from "@/entities/table-cell";
import { IS_HIDDEN_KEY, IS_MIN_VALUE_KEY, NAME_KEY, PRICE_KEY, THUMB_KEY } from "@/shared/constants";
import { formatCurrency, formatDate, setItemHiddenCaption } from "@/shared/utils";
import { type TPositionTableOptions } from "../model/types";
import { type TItemData } from "@/shared/types";

const PositionsTableRows = <T extends TItemData,>({
  captions,
  handleClick,
  values
}: { captions: Record<keyof T, string>; handleClick?: () => void; values: TPositionTableOptions<T>[]; }) => (
  values.map(
    ({ key, value, ...data }) => {
      const type = String(key);
      const str = String(value);
      const caption = key === IS_HIDDEN_KEY ? setItemHiddenCaption(Number(value)) : formatDate(str, type);
      const priceValue = `${data[IS_MIN_VALUE_KEY] === 1 ? 'от ' : ''}${formatCurrency(str)}`;
      const title = key === PRICE_KEY ? priceValue : caption;

      return (
        <TableCell
          key={type}
          caption={captions[key]}
          type={type}
        >
          {type === NAME_KEY ? <PositionMeta {...{ caption: title, thumb: data[THUMB_KEY], ...( handleClick && {onClick: handleClick}) }} /> : title}
        </TableCell>
      )
    }
  )
);

export default PositionsTableRows;
