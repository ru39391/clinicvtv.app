import { type FC } from "react";
import { type ITableRow } from "../model/types";
import styles from './table-row.module.css';

const TableRow: FC<ITableRow> = ({ children, isCaption, type }) => {
  const rowClassName = type ? `${styles.row} ${styles[`row_type_${type}`]}` : styles.row;

  return (
    <div className={isCaption ? `${rowClassName} ${styles.row_type_caption}` : rowClassName}>{children}</div>
  )
};

export default TableRow;
