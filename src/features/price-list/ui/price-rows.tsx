import { type FC } from "react";
import { TableCell } from "@/entities/table-cell";
import { PRICE_KEY, IS_HIDDEN_KEY, IS_MIN_VALUE_KEY } from "@/shared/constants";
import { formatCurrency, formatDate, setItemHiddenCaption } from "@/shared/utils";
import { type IPriceRows } from "../model/types";

const PriceRows: FC<IPriceRows> = ({ captions, values }) => values.map(
  ({ key, value, ...data }) => {
    const caption = key === IS_HIDDEN_KEY ? setItemHiddenCaption(value) : formatDate(value, key);
    const priceValue = `${data[IS_MIN_VALUE_KEY] === 1 ? 'от ' : ''}${formatCurrency(value)}`;

    return (
      <TableCell
        key={key}
        caption={captions[key]}
        type={key}
      >
        {key === PRICE_KEY ? priceValue : caption}
      </TableCell>
    )
  }
);

export default PriceRows;
