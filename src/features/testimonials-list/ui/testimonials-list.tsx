import { useState, type FC } from "react";
import { Button } from "@/shared/ui";
import { EditIcon, TrashBinIcon } from "@/shared/icons";
import { sortTestimonials } from "../lib/sort-testimonials-list";
import { Table } from "@/entities/table";
import { TableCell } from "@/entities/table-cell";
import { TableRow } from "@/entities/table-row";
import { useModalStore } from "@/shared/store";
import { useTestimonialStore, type TTestimonialQueryData } from "@/entities/testimonial";
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
  UPDATED_AT_KEY,
  REMOVE_POSITION_KEY,
  POSITION_KEY,
  CONFIRM_KEY
} from "@/shared/constants";
import { formatDate, setItemHiddenCaption } from "@/shared/utils";
import type { TTestimonialData } from "@/shared/types";

const TestimonialRows: FC<{ values: (Record<string, string> & { rating: number; })[]; }> = ({ values }) => values.map(
  ({ key, value, rating }) => {
    const caption = key === IS_HIDDEN_KEY ? setItemHiddenCaption(value) : formatDate(value, key);

    return (
      <TableCell
        key={key}
        caption={TESTIMONIAL_CAPTIONS[key]}
        type={key}
      >
        {key === RATING_KEY ? String(rating) : caption}
      </TableCell>
    )
  }
);

const TestimonialsList: FC = () => {
  const [sortData, setSortData] = useState<TTestimonialQueryData | null>(null);
  const { open } = useModalStore();
  const { data: testimonials, isLoading, setCurrItemData } = useTestimonialStore();

  const keys = [
    NAME_KEY,
    DESC_KEY,
    IS_HIDDEN_KEY,
    RATING_KEY,
    INTRO_KEY,
    CREATED_AT_KEY,
    UPDATED_AT_KEY
  ];

  const sortColValues = async (key: keyof TTestimonialData) => {
    const sortby = key === INTRO_KEY ? SPEC_ID_KEY : key;
    const data = await sortTestimonials(sortby as TTestimonialQueryData["sortby"]);

    setSortData(data);
  }

  if(!isLoading && !testimonials.length) {
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
            {TESTIMONIAL_CAPTIONS[key]}
          </TableCell>
        ))}
      </TableRow>
      {testimonials.map(({ id, ...props }: TTestimonialData) => {
        const values = keys.reduce(
          (acc, key) => ([
            ...acc,
            {
              key,
              value: String(props[key as keyof TTestimonialData]),
              [RATING_KEY]: props[RATING_KEY]
            }
          ]),
          []
        );

        return (
          <TableRow key={id.toString()} type="testimonial">
            <TestimonialRows {...{ values }} />

            <TableCell type="btns">
              <Button
                handleClick={() => setCurrItemData(id)}
                style="icon"
              >
                <EditIcon />
              </Button>
              <Button
                handleClick={
                  () => console.log('open')//open({ content: <RemovePositionModal {...{ id, name: props.name }} /> })
                }
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
