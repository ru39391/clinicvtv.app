import { type FC } from "react";
import { TableCell } from "@/entities/table-cell";
import { IS_HIDDEN_KEY, IS_MIN_VALUE_KEY, NAME_KEY, PRICE_KEY, THUMB_KEY } from "@/shared/constants";
import { formatCurrency, formatDate, setItemHiddenCaption } from "@/shared/utils";
import { type TPositionTableData } from "../model/types";
import { type TItemData } from "@/shared/types";

const PositionTableMedia: FC<{ caption: string; thumb?: string; }> = ({ caption, thumb }) => (
  thumb === undefined
    ? caption
    : <div>
        <div>{Boolean(thumb) && <img className="" src={thumb} alt={caption} />}</div>
        <div>{caption}</div>
      </div>
);

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
      const title = key === PRICE_KEY ? priceValue : caption;
      console.log(data[THUMB_KEY]);
      return (
        <TableCell
          key={type}
          caption={captions[key]}
          type={type}
        >
          {type === NAME_KEY ? <PositionTableMedia {...{ caption: title, thumb: data[THUMB_KEY] }} /> : title}
        </TableCell>
      )
    }
  )
);

export default PositionTableRows;
