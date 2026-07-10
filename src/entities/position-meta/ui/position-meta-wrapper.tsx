import type { FC } from "react";
import type { IPositionMetaWrapper } from "../model/types";
import styles from './position-meta-wrapper.module.css';

const PositionMetaWrapper: FC<IPositionMetaWrapper> = ({ children, type }) => (
  <div className={type ? `${styles.cards} ${styles[`cards_type_${type}`]}` : styles.cards}>{children}</div>
);

export default PositionMetaWrapper;
