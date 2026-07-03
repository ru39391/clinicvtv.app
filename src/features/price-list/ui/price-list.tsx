import { useState, type FC } from "react";
import { Button, Card, Loader } from "@/shared/ui";
import { EditIcon, TrashBinIcon } from "@/shared/icons";

import { PositionItem } from "@/entities/position-item";
import { sortPositions } from "../lib/sort-positions";
import { useHandlePositions } from "../hooks/use-handle-positions";

import { useModalStore } from "@/shared/store";
import { usePricelistStore, type TPriceQueryData } from "@/entities/price";
import { Table } from "@/entities/table";
import { TableRow } from "@/entities/table-row";
import {
  LIST_IS_EMPTY,
  PRICE_CAPTIONS,
  NAME_KEY,
  PRICE_KEY,
  DEPT_ID_KEY,
  IS_HIDDEN_KEY,
  CREATED_AT_KEY,
  UPDATED_AT_KEY
} from "@/shared/constants";
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
  const captions: string[] = keys.map(key => PRICE_CAPTIONS[key]);

  const setClassName = (key: string): string => `${styles.positions__col} ${styles[`positions__col_type_${key}`]}`;
  const setRowClass = (keys: string[]): Record<string, string> => keys.reduce((acc, key) => ({ ...acc, [key]: setClassName(key) }), {});
  const sortColValues = async (name: keyof TPositionData) => {
    console.log(name);
    return;

    const arr = ["price", "rating"] as (keyof TPositionData)[];

    if(!arr.includes(name)) {
      return;
    }

    const data = await sortPositions(name as TPriceQueryData["sortby"]);

    setSortData(data);
  }

  if(!isLoading && !pricelist.length) {
    return LIST_IS_EMPTY;
  }

  return (
    <Table>
      <TableRow>
        {keys.map((name) => (
          <div key={name} className={setClassName(name)}>
            <span
              className={`${styles.positions__caption} ${styles[`positions__caption_type_${name}`]}`}
              onClick={() => sortColValues(name as keyof TPositionData)}
            >
              {PRICE_CAPTIONS[name]}
              {sortData?.sortby === name && sortData?.sortdir === "ASC" && <span className={styles.positions__sortdir}>▲</span>}
              {sortData?.sortby === name && sortData?.sortdir === "DESC" && <span className={styles.positions__sortdir}>▼</span>}
            </span>
          </div>
        ))}
      </TableRow>
      {pricelist.map(({ id, ...props }: TPriceData) => {
        const values = keys.map(key => props[key as keyof TPriceData]);

        return (
          <TableRow key={id.toString()}>
            {props.name}

            <div className={styles.positions__col_type_btns}>
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
            </div>
          </TableRow>
        )
      })}
    </Table>
  )
};

export default PriceList;
