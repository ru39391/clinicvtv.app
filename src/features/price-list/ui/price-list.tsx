import { useState, type FC } from "react";
import { Button, Card, Loader } from "@/shared/ui";
import { EditIcon, TrashBinIcon } from "@/shared/icons";
import { sortPricelist } from "../lib/sort-price-list";

import { useHandlePositions } from "../hooks/use-handle-positions";

import { useModalStore } from "@/shared/store";
import { usePricelistStore, type TPriceQueryData } from "@/entities/price";
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
import {
  formatCurrency,
  formatDate,
  setItemHiddenCaption
} from "@/shared/utils";
import type { TItemData, TPositionData, TPriceData } from "@/shared/types";

const styles = {};

const RemovePositionModal: FC<{
  id: TItemData["id"];
  name: TItemData["name"];
}> = ({ id, name }) => {
  const { close } = useModalStore();
  const { handleRemoveItem } = {
    handleRemoveItem: (id) => console.log(id) //useHandlePositions()
  };
  const { isLoading } = usePricelistStore();

  return (
    <Card
      {...{
        title: "Удалить товар",
        subtitle: `Вы действительно хотите удалить товар ${name}?`,
        type: ["md"]
      }}
    >
      <div className={styles.positions__actions}>
        <Button
          handleClick={() => handleRemoveItem(id)}
          isDisabled={isLoading}
          style={isLoading ? "plain" : "row"}
        >
          {isLoading ? <Loader isVisible={isLoading} size="xs" /> : "Да"}
        </Button>
        <Button
          handleClick={() => close()}
          isDisabled={isLoading}
          style="plain"
        >
          Нет
        </Button>
      </div>
    </Card>
  )
};

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

const PriceList: FC = () => {
  const [sortData, setSortData] = useState<TPriceQueryData | null>(null);
  const { open } = useModalStore();
  const { data: pricelist, isLoading, setCurrPriceData } = usePricelistStore();

  const keys = [
    NAME_KEY,
    PRICE_KEY,
    DEPT_ID_KEY,
    IS_HIDDEN_KEY,
    CREATED_AT_KEY,
    UPDATED_AT_KEY
  ];

  const sortColValues = async (key: keyof TPositionData) => {
    const data = await sortPricelist(key as TPriceQueryData["sortby"]);

    setSortData(data);
  }

  if(!isLoading && !pricelist.length) {
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
      {pricelist.map(({ id, ...props }: TPriceData) => {
        const values = keys.reduce(
          (acc, key) => ([
            ...acc,
            {
              key,
              value: String(props[key as keyof TPriceData]),
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
                handleClick={() => setCurrPriceData(id)}
                style="icon"
              >
                <EditIcon />
              </Button>
              <Button
                handleClick={() => open({ content: <RemovePositionModal {...{ id, name: props.name }} /> })}
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
