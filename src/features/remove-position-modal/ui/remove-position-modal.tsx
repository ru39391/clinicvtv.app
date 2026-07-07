import { Button, Card, Loader } from "@/shared/ui";
import { useModalStore } from "@/shared/store";
import {
  REMOVE_POSITION_KEY,
  POSITION_KEY,
  CONFIRM_KEY
} from "@/shared/constants";
import { useRemovePositionModal } from "../hooks/use-remove-position-modal";
import type { IRemovePositionModal } from "../model/types";
import styles from './remove-position-modal.module.css';

const RemovePositionModal = <T extends { id: number },>({
  id,
  isLoading,
  name,
  removeItem
}: IRemovePositionModal<T>) => {
  const { close } = useModalStore();
  const { handleRemoveItem } = useRemovePositionModal<T>();

  return (
    <Card
      {...{
        title: `${REMOVE_POSITION_KEY} ${POSITION_KEY}`,
        subtitle: `${CONFIRM_KEY} ${REMOVE_POSITION_KEY.toLowerCase()} "${name}"?`,
        type: ["md"]
      }}
    >
      <div className={styles.row}>
        <Button
          handleClick={() => handleRemoveItem({ id, removeItem })}
          isDisabled={isLoading}
          style={isLoading ? "plain" : "row"}
        >
          {isLoading ? <Loader isVisible={isLoading} size="xs" /> : "Да"}
        </Button>
        <Button
          handleClick={() => close()}
          isDisabled={isLoading}
          style="plain"
        >
          Нет
        </Button>
      </div>
    </Card>
  )
};

export default RemovePositionModal;
