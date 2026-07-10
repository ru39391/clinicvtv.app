import { useEffect, type FC } from "react";
import { Button, Card, Loader } from "@/shared/ui";
import { PositionMeta, PositionMetaWrapper } from "@/entities/position-meta";
import { Wrapper } from "@/entities/wrapper";
import { useExamplePicStore, type TExamplePicData } from "@/entities/example-picture";
import { useModalStore } from "@/shared/store";
import {
  CLOSE_KEY,
  LIST_IS_EMPTY,
  SAVE_POSITION_KEY,
  UPDATED_AT_KEY
} from "@/shared/constants";
import { formatDate } from "@/shared/utils";
import { type ISelectExamplePicModal } from "../model/types";
import styles from './remove-position-modal.module.css';

const SelectExamplePicModal: FC<ISelectExamplePicModal> = ({ children, data }) => {
  const { close } = useModalStore();
  const {
    data: pictures,
    fetchItems,
    isLoading,
    pagination
  } = useExamplePicStore();
  //const { handleRemoveItem } = useRemovePositionModal<T>();

  useEffect(() => {
    fetchItems(null);
  }, []);

  return (
    <Card
      {...{
        title: data.name,
        subtitle: data.desc,
        type: ["lg"]
      }}
    >
      <Wrapper
        {...{
          footer: children,
          title: "Выберите изображение",
          type: "cards"
        }}
      >
        <Loader
          hasCircle={true}
          isVisible={isLoading}
        >
          <PositionMetaWrapper type="list">
            {!isLoading && !pictures.length
              ? LIST_IS_EMPTY
              : pictures.map(
                  ({ height, name, size_formatted, updatedAt, url, width }: TExamplePicData) => (
                    <PositionMeta
                      key={name}
                      {...{
                        caption: name,
                        thumb: url,
                        type: "col",
                        onClick: () => console.log(url)
                      }}
                    >
                      <p>Дата загрузки: {formatDate(updatedAt, UPDATED_AT_KEY, true)}</p>
                      <p>Размер: {size_formatted}</p>
                      <p>Разрешение: {width}х{height}px</p>
                    </PositionMeta>
                  )
                )
            }
          </PositionMetaWrapper>
        </Loader>
      </Wrapper>
      {/*
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
      */}
    </Card>
  )
};

export default SelectExamplePicModal;
