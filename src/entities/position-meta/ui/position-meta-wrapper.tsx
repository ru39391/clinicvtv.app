import type { FC, ReactNode } from "react";
import styles from './position-meta-wrapper.module.css';

const PositionMetaWrapper: FC<{ children: ReactNode; }> = ({ children }) => (<div className={styles.cards}>{children}</div>);

export default PositionMetaWrapper;
