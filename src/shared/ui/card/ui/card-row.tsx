import { type FC } from "react";
import { type ICard } from "../model/types";
import styles from './card.module.css';

const CardRow: FC<{ children: ICard["children"]; justify?: "start"; }> = ({ children, justify }) => (
  <div className={justify ? `${styles.row} ${styles[`row_js_${justify}`]}` : styles.row}>{children}</div>
);

export default CardRow;
