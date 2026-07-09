import { useEffect, type FC, type MouseEvent } from "react";
import { useModalStore } from "@/shared/store";
import { CloseIcon } from "@/shared/icons";
import styles from './modal.module.css';

const Modal: FC = () => {
  const { content, isOpen, type, close } = useModalStore();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        close();
      }
    };

    document.addEventListener('keydown', handleEsc);

    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, close]);

  if(!isOpen) {
    return "";
  }

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      close();
    }
  };

  return (
    <div className={type ? `${styles.modal} ${styles[`modal_type_${type}`]}` : styles.modal} onClick={handleOverlayClick}>
      <button className={styles.modal__close} onClick={() => close()} type="button">
        <CloseIcon />
      </button>
      {content && <div className={styles.modal__wrapper}>{content}</div>}
    </div>
  );
};

export default Modal;
