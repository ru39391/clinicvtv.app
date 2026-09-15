import { type FC } from "react";
import { type ITable } from "../model/types";
import styles from './table.module.css';

const Table: FC<ITable> = ({ children }) => <div className={styles.table}>{children}</div>;

export default Table;
