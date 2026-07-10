import { type FC } from "react";
import { type IPositionMeta } from "../model/types";
import styles from './position-meta.module.css';

const PositionMeta: FC<IPositionMeta> = ({
  caption,
  children,
  onClick,
  thumb,
  type
}) => (
  thumb === undefined
    ? caption
    : <div className={type ? `${styles.meta} ${styles[`meta_type_${type}`]}` : styles.meta}>
        <div className={styles.meta__picture} {...( onClick && { onClick: onClick } )}>
          {Boolean(thumb) && <img className={styles.meta__img} src={thumb} alt={caption} />}
        </div>
        <div className={styles.meta__title}>{caption}</div>
        {Boolean(children) && <div className={styles.meta__desc}>{children}</div>}
      </div>
);

export default PositionMeta;
