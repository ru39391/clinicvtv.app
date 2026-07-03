import { type FC } from "react";
import { type ITableRow } from "../model/types";
import styles from './table-row.module.css';

const TableRow: FC<ITableRow> = ({ children, type = null }) => {
  const rowClassName = type === "caption" ? `${styles.row} ${styles.row_type_caption}` : styles.row;

  return (
    <div className={rowClassName}>{children}</div>
  )
};

export default TableRow;
