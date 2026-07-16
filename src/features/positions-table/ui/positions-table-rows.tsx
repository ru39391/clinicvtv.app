import type { FC, ReactNode } from "react";
import { Button } from "@/shared/ui";
import { PositionMeta } from "@/entities/position-meta";
import { TableCell } from "@/entities/table-cell";
import {
  DEPT_ID_KEY,
  IS_HIDDEN_KEY,
  IS_MIN_VALUE_KEY,
  NAME_KEY,
  PRICE_KEY,
  THUMB_KEY,
  URL_KEY
} from "@/shared/constants";
import { SITE_URL } from "@/shared/api";
import { formatCurrency, formatDate, setItemHiddenCaption } from "@/shared/utils";
import type { IPositionsTableRows } from "../model/types";
import type { TItemData } from "@/shared/types";

const PositionsTableLink: FC<Record<"caption" | "url", string>> = ({ caption, url }) => (
  caption
    ? <Button
      href={url}
      caption={caption}
      style="unstyled"
      target="_blank"
    />
    : ""
);

const PositionsTableRows = <T extends TItemData,>({ captions, handleClick, values }: IPositionsTableRows<T>) => {
  const handleCaption = ({ data, type, value }: {
    data: Omit<IPositionsTableRows<T>["values"][number], "key" | "value">;
    type: string;
    value: IPositionsTableRows<T>["values"][number]["value"];
  }): string | ReactNode => {
    const str = String(value);

    switch (type) {
      case IS_HIDDEN_KEY:
        return setItemHiddenCaption(Number(value));
      case PRICE_KEY:
        return `${data[IS_MIN_VALUE_KEY] === 1 ? 'от ' : ''}${formatCurrency(str)}`;
      case NAME_KEY:
        return <PositionMeta {...{ caption: str, thumb: data[THUMB_KEY], ...(handleClick && { onClick: handleClick }) }} />;
      case DEPT_ID_KEY:
        return <PositionsTableLink {...{ caption: String(value), url: `${SITE_URL}${String(data[URL_KEY])}` }} />;
      default:
        return formatDate(str, type);
    }
  }

  return (
    values.map(
      ({ key, value, ...data }) => {
        const type = String(key);
        const caption = handleCaption({ type, value, data });

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
  )
};

export default PositionsTableRows;
