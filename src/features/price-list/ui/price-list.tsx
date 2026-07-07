import { useState, type FC } from "react";
import { sortPricelist } from "../lib/sort-pricelist";
import { Table } from "@/entities/table";
import { TableCell } from "@/entities/table-cell";
import { TableRow } from "@/entities/table-row";
import { type TPricelistData, type TPricelistQueryData } from "@/entities/pricelist";
import { type IPriceList } from "../model/types";

const PriceList: FC<IPriceList> = ({
  captions,
  children,
  keys
}) => {
  // TODO: оформить в виде хука
  const [sortData, setSortData] = useState<TPricelistQueryData | null>(null);

  const sortColValues = async (key: keyof TPricelistData) => {
    const data = await sortPricelist(key);

    setSortData(data);
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
      {children}
    </Table>
  )
};

export default PriceList;
