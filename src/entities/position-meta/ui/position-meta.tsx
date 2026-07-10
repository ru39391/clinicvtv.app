import { type FC } from "react";
import { type IPositionMeta } from "../model/types";
import styles from './position-meta.module.css';

const PositionMeta: FC<IPositionMeta> = ({
  alt,
  caption,
  children,
  isActive,
  onClick,
  thumb,
  type
}) => (
  thumb === undefined
    ? caption
    : <div className={type ? `${styles.meta} ${styles[`meta_type_${type}`]}` : styles.meta}>
        <div
          className={alt ? `${styles.meta__picture} ${styles.meta__picture_type_toggler}` : styles.meta__picture}
          {...( onClick && { onClick: onClick } )}
        >
          {Boolean(thumb) && <img className={styles.meta__img} src={thumb} alt={caption} />}
          {Boolean(alt) && <span className={isActive ? `${styles.meta__alt} ${styles.meta__alt_active}` : styles.meta__alt}>{String(alt)}</span>}
        </div>
        {Boolean(caption) && <div className={styles.meta__title}>{caption}</div>}
        {Boolean(children) && <div className={styles.meta__desc}>{children}</div>}
      </div>
);

export default PositionMeta;
