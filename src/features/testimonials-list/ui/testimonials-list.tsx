import { useState, type FC } from "react";
import { Button } from "@/shared/ui";
import { EditIcon, TrashBinIcon } from "@/shared/icons";
import { sortTestimonials } from "../lib/sort-testimonials-list";
import { Table } from "@/entities/table";
import { TableCell } from "@/entities/table-cell";
import { TableRow } from "@/entities/table-row";
import {
  LIST_IS_EMPTY,
  TESTIMONIAL_CAPTIONS,
  NAME_KEY,
  DESC_KEY,
  INTRO_KEY,
  SPEC_ID_KEY,
  RATING_KEY,
  IS_HIDDEN_KEY,
  CREATED_AT_KEY,
  UPDATED_AT_KEY
} from "@/shared/constants";
import { formatDate, setItemHiddenCaption } from "@/shared/utils";
import { type TTestimonialData, type TTestimonialQueryData } from "@/entities/testimonial";
import { type ITestimonialsList, type ITestimonialRows } from "../model/types";

const captions = {...TESTIMONIAL_CAPTIONS as Record<keyof TTestimonialData, string>};

const TestimonialRows: FC<ITestimonialRows> = ({ values }) => values.map(
  ({ key, value }) => {
    const caption = key === IS_HIDDEN_KEY ? setItemHiddenCaption(value) : formatDate(value, key);

    return (
      <TableCell
        key={key}
        caption={captions[key]}
        type={key}
      >
        {caption}
      </TableCell>
    )
  }
);

const TestimonialsList: FC<ITestimonialsList> = ({
  arr,
  isLoading,
  setCurrData,
  showRemoveModal
}) => {
  // TODO: оформить в виде хука
  const [sortData, setSortData] = useState<TTestimonialQueryData | null>(null);
  const keys: (keyof TTestimonialData)[] = [
    NAME_KEY,
    DESC_KEY,
    IS_HIDDEN_KEY,
    RATING_KEY,
    INTRO_KEY,
    CREATED_AT_KEY,
    UPDATED_AT_KEY
  ];

  const sortColValues = async (key: keyof TTestimonialData) => {
    const sortby: keyof TTestimonialData = key === INTRO_KEY ? SPEC_ID_KEY : key;
    const data = await sortTestimonials(sortby);

    setSortData(data);
  }

  if(!isLoading && !arr.length) {
    return LIST_IS_EMPTY;
  }

  return (
    <Table>
      <TableRow
        isCaption={true}
        type="testimonial"
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
            {captions[key]}
          </TableCell>
        ))}
      </TableRow>
      {arr.map((data: TTestimonialData) => {
        const values = keys.reduce(
          (acc, key) => ([
            ...acc,
            { key, value: String(data[key]) }
          ]),
          [] as ITestimonialRows["values"]
        );

        return (
          <TableRow key={data.id.toString()} type="testimonial">
            <TestimonialRows {...{ values }} />
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

export default TestimonialsList;
