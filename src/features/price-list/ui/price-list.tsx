import { useState, type FC } from "react";
import { Button } from "@/shared/ui";
import { EditIcon, TrashBinIcon } from "@/shared/icons";
import { sortPricelist } from "../lib/sort-pricelist";
import { Table } from "@/entities/table";
import { TableCell } from "@/entities/table-cell";
import { TableRow } from "@/entities/table-row";
import {
  LIST_IS_EMPTY,
  PRICE_CAPTIONS,
  NAME_KEY,
  PRICE_KEY,
  DEPT_ID_KEY,
  IS_HIDDEN_KEY,
  IS_MIN_VALUE_KEY,
  CREATED_AT_KEY,
  UPDATED_AT_KEY
} from "@/shared/constants";
import { formatCurrency, formatDate, setItemHiddenCaption } from "@/shared/utils";
import { type TPricelistData, type TPricelistQueryData } from "@/entities/pricelist";
import type { IPriceList } from "../model/types";

const PriceRows: FC<{ values: (Record<string, string> & { isMinValue: number; })[]; }> = ({ values }) => values.map(
  ({ key, value, isMinValue }) => {
    const caption = key === IS_HIDDEN_KEY ? setItemHiddenCaption(value) : formatDate(value, key);
    const priceValue = `${isMinValue === 1 ? 'от ' : ''}${formatCurrency(value)}`;

    return (
      <TableCell
        key={key}
        caption={PRICE_CAPTIONS[key]}
        type={key}
      >
        {key === PRICE_KEY ? priceValue : caption}
      </TableCell>
    )
  }
);

const PriceList: FC<IPriceList> = ({
  arr,
  isLoading,
  setCurrData,
  showRemoveModal
}) => {
  // TODO: оформить в виде хука
  const [sortData, setSortData] = useState<TPricelistQueryData | null>(null);
  const keys = [
    NAME_KEY,
    PRICE_KEY,
    DEPT_ID_KEY,
    IS_HIDDEN_KEY,
    CREATED_AT_KEY,
    UPDATED_AT_KEY
  ];

  const sortColValues = async (key: keyof TPricelistData) => {
    const data = await sortPricelist(key as TPricelistQueryData["sortby"]);

    setSortData(data);
  }

  if(!isLoading && !arr.length) {
    return LIST_IS_EMPTY;
  }

  return (
    <Table>
      <TableRow
        isCaption={true}
        type="price"
      >
        {keys.map((key) => (
          <TableCell
            key={key}
            isCaption={true}
            handleClick={() => sortColValues(key)}
            type={key}
            {...(sortData && {
              sortby: sortData.sortby,
              sortdir: sortData.sortdir
            })}
          >
            {PRICE_CAPTIONS[key]}
          </TableCell>
        ))}
      </TableRow>
      {arr.map(({ id, ...props }: TPricelistData) => {
        const values = keys.reduce(
          (acc, key) => ([
            ...acc,
            {
              key,
              value: String(props[key as keyof TPricelistData]),
              [IS_MIN_VALUE_KEY]: props[IS_MIN_VALUE_KEY]
            }
          ]),
          []
        );

        return (
          <TableRow key={id.toString()} type="price">
            <PriceRows {...{ values }} />
            <TableCell type="btns">
              <Button
                handleClick={() => setCurrData(id)}
                style="icon"
              >
                <EditIcon />
              </Button>
              <Button
                handleClick={() => showRemoveModal({ id, name: props.name })}
                style="unstyled"
              >
                <TrashBinIcon />
              </Button>
            </TableCell>
          </TableRow>
        )
      })}
    </Table>
  )
};

export default PriceList;
