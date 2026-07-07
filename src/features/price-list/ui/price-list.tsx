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
import { type IPriceList, type IPriceRows } from "../model/types";

const captions = {...PRICE_CAPTIONS as Record<keyof TPricelistData, string>};

const PriceRows: FC<IPriceRows> = ({ values }) => values.map(
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

const PriceList: FC<IPriceList> = ({
  arr,
  isLoading,
  setCurrData,
  showRemoveModal
}) => {
  // TODO: оформить в виде хука
  const [sortData, setSortData] = useState<TPricelistQueryData | null>(null);
  const keys: (keyof TPricelistData)[] = [
    NAME_KEY,
    PRICE_KEY,
    DEPT_ID_KEY,
    IS_HIDDEN_KEY,
    CREATED_AT_KEY,
    UPDATED_AT_KEY
  ];

  const sortColValues = async (key: keyof TPricelistData) => {
    const data = await sortPricelist(key);

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
            {captions[key]}
          </TableCell>
        ))}
      </TableRow>
      {arr.map((data: TPricelistData) => {
        const values = keys.reduce(
          (acc, key) => ([
            ...acc,
            {
              key,
              value: String(data[key]),
              [IS_MIN_VALUE_KEY as string]: data[IS_MIN_VALUE_KEY]
            } as IPriceRows["values"][number]
          ]),
          [] as IPriceRows["values"]
        );

        return (
          <TableRow key={data.id.toString()} type="price">
            <PriceRows {...{ values }} />
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
      })}
    </Table>
  )
};

export default PriceList;
