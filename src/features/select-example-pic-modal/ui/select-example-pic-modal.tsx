import { useEffect, type FC } from "react";
import { Card, Loader } from "@/shared/ui";
import { PositionMeta, PositionMetaWrapper } from "@/entities/position-meta";
import { Wrapper } from "@/entities/wrapper";
import { useExamplePicStore, type TExamplePicData } from "@/entities/example-picture";
import { useModalStore } from "@/shared/store";
import { useSelectExamplePic } from "../hooks/use-select-example-pic";
import {
  EDIT_POSITION_KEY,
  IMG_AFTER_KEY,
  IMG_BEFORE_KEY,
  LIST_IS_EMPTY,
  POSITION_KEY,
  THUMB_KEY,
  UPDATED_AT_KEY
} from "@/shared/constants";
import { formatDate } from "@/shared/utils";
import { type ISelectExamplePicModal } from "../model/types";
import styles from './select-example-pic-modal.module.css';

const SelectExamplePicModal: FC<ISelectExamplePicModal> = ({ children, data }) => {
  //const { close } = useModalStore();
  const {
    data: pictures,
    fetchItems,
    isLoading,
    pagination
  } = useExamplePicStore();
  const {
    currPicType,
    currPicsData,
    setCurrPicType,
    handlePicsData
  } = useSelectExamplePic();

  useEffect(() => {
    fetchItems({ perPage: 20 });
  }, []);

  return (
    <Card
      {...{
        title: `${EDIT_POSITION_KEY} ${POSITION_KEY}`,
        type: ["lg"]
      }}
    >
      <div className={styles.controllers}>
        <PositionMeta
          {...{
            alt: "До",
            caption: "",
            thumb: currPicsData?.[IMG_BEFORE_KEY] || data[IMG_BEFORE_KEY][THUMB_KEY],
            type: "row",
            isActive: currPicType === IMG_BEFORE_KEY,
            onClick: () => setCurrPicType(IMG_BEFORE_KEY)
          }}
        />
        <PositionMeta
          {...{
            alt: "После",
            caption: data.name,
            thumb: currPicsData?.[IMG_AFTER_KEY] || data[IMG_AFTER_KEY][THUMB_KEY],
            type: "row",
            isActive: currPicType === IMG_AFTER_KEY,
            onClick: () => setCurrPicType(IMG_AFTER_KEY)
          }}
        >
          {data.desc}
        </PositionMeta>
      </div>
      <Wrapper
        {...{
          footer: children({
            fetchExamplePics: fetchItems,
            isPicsDataLoading: isLoading,
            picsPagination: pagination
          }),
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
                        type: "row",
                        onClick: () => handlePicsData({ [currPicType]: url })
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
