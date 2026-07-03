import { type FC } from "react";
import { type ITableCell } from "../model/types";
import styles from './table-cell.module.css';

const TableCell: FC<ITableCell> = ({
  children,
  handleClick,
  isCaption,
  sortdir,
  type
}) => {
  const rowClassName = `${styles.col} ${styles[`col_type_${type}`]}`;

  if(!isCaption) return <div className={rowClassName}>{children}</div>;

  return (
    <div className={rowClassName}>
      <span
        className={`${styles.col__caption} ${styles[`col__caption_type_${type}`]}`}
        {...(handleClick && { onClick: handleClick })}
      >
        {children}
        {sortdir === "ASC" && <span className={styles.col__sortdir}>▲</span>}
        {sortdir === "DESC" && <span className={styles.col__sortdir}>▼</span>}
      </span>
    </div>
  )
};

export default TableCell;
