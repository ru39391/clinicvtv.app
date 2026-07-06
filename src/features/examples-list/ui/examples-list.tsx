import { type FC } from "react";
import { Button } from "@/shared/ui";
import { EditIcon, TrashBinIcon } from "@/shared/icons";
import { Table } from "@/entities/table";
import { TableCell } from "@/entities/table-cell";
import { TableRow } from "@/entities/table-row";
import {
  LIST_IS_EMPTY,
  EXAMPLE_CAPTIONS,
  NAME_KEY,
  DESC_KEY,
  INTRO_KEY,
  IS_HIDDEN_KEY,
  CREATED_AT_KEY,
  UPDATED_AT_KEY
} from "@/shared/constants";
import { formatDate, setItemHiddenCaption } from "@/shared/utils";
import { useSortExamplesList } from "../hooks/use-sort-examples-list";
import { type TExampleData } from "@/entities/example";
import { type IExamplesList } from "../model/types";

const ExampleRows: FC<{ values: Record<string, string>[]; }> = ({ values }) => values.map(
  ({ key, value }) => {
    const caption = key === IS_HIDDEN_KEY ? setItemHiddenCaption(value) : formatDate(value, key);

    return (
      <TableCell
        key={key}
        caption={EXAMPLE_CAPTIONS[key]}
        type={key}
      >
        {caption}
      </TableCell>
    )
  }
);

const ExamplesList: FC<IExamplesList> = ({
  arr,
  isLoading,
  setCurrData,
  showRemoveModal
}) => {
  const { sortData, sortColValues } = useSortExamplesList();
  const keys = [
    NAME_KEY,
    DESC_KEY,
    IS_HIDDEN_KEY,
    INTRO_KEY,
    CREATED_AT_KEY,
    UPDATED_AT_KEY
  ];

  if(!isLoading && !arr.length) {
    return LIST_IS_EMPTY;
  }

  return (
    <Table>
      <TableRow
        isCaption={true}
        type="example"
      >
        {keys.map((key) => (
          key !== DESC_KEY && <TableCell
            key={key}
            isCaption={true}
            handleClick={() => sortColValues(key)}
            type={key}
            {...(sortData && {
              sortby: sortData.sortby,
              sortdir: sortData.sortdir
            })}
          >
            {EXAMPLE_CAPTIONS[key]}
          </TableCell>
        ))}
      </TableRow>
      {arr.map(({ id, ...props }: TExampleData) => {
        const values = keys.reduce(
          (acc, key) => ([
            ...acc,
            {
              key,
              value: String(props[key as keyof TExampleData]),
            }
          ]),
          []
        );

        return (
          <TableRow key={id.toString()} type="example">
            <ExampleRows {...{ values }} />
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

export default ExamplesList;
