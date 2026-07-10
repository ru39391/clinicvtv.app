import { useEffect, type FC } from "react";
import { Button, Card, Loader } from "@/shared/ui";
import { PositionMeta, PositionMetaWrapper } from "@/entities/position-meta";
import { useExamplePicStore } from "@/entities/example-picture";
import { useModalStore } from "@/shared/store";
import {
  CLOSE_KEY,
  SAVE_POSITION_KEY
} from "@/shared/constants";
//import { useRemovePositionModal } from "../hooks/use-remove-position-modal";
import { type ISelectExamplePicModal } from "../model/types";
import styles from './remove-position-modal.module.css';

const SelectExamplePicModal: FC<ISelectExamplePicModal> = ({ data, isLoading }) => {
  const { close } = useModalStore();
  const { data: pictures, fetchItems } = useExamplePicStore();
  //const { handleRemoveItem } = useRemovePositionModal<T>();

  useEffect(() => {
    fetchItems(null);
  }, []);

  return (
    <Card
      {...{
        title: data.name,
        subtitle: data.desc,
        type: ["md"]
      }}
    >
      <PositionMetaWrapper>
        {pictures.map(
          ({ name, url }) => (
            <PositionMeta
              key={name}
              {...{
                caption: name,
                thumb: url,
                type: "col",
                onClick: () => console.log(url)
              }}
            />
          )
        )}
      </PositionMetaWrapper>
      <div className={styles.row}>
        <Button
          handleClick={() => console.log(data)}
          isDisabled={isLoading}
          style={isLoading ? "plain" : "row"}
        >
          {isLoading ? <Loader isVisible={isLoading} size="xs" /> : SAVE_POSITION_KEY}
        </Button>
        <Button
          handleClick={() => close()}
          isDisabled={isLoading}
          style="plain"
        >
          {CLOSE_KEY}
        </Button>
      </div>
    </Card>
  )
};

export default SelectExamplePicModal;
