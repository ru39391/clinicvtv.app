import { type FC } from "react";
import styles from './table-cell.module.css';

const TableCell: FC<Record<"key" | "value" | "className" | "caption", string>> = ({ caption, className, key, value }) => (
  <div key={key} className={className}>
    <span className={styles.caption}>{caption}: </span>
    <span className={styles.value}>{value.toString()}</span>
  </div>
);

export default TableCell;
