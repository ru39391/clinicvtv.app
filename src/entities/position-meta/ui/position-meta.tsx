import { type FC } from "react";
import { type IPositionMeta } from "../model/types";
import styles from './position-meta.module.css';

const PositionMeta: FC<IPositionMeta> = ({ caption, onClick, thumb }) => (
  thumb === undefined
    ? caption
    : <div className={styles.meta}>
        <div className={styles.meta__row}>
          <div className={styles.meta__picture} {...( onClick && { onClick: onClick } )}>
            {Boolean(thumb) && <img className={styles.meta__img} src={thumb} alt={caption} />}
          </div>
          <div className={styles.meta__title}>{caption}</div>
        </div>
      </div>
);

export default PositionMeta;
