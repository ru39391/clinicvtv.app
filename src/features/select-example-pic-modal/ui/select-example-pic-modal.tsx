import { useEffect, type FC } from "react";
import { Button, Card, CardRow, Loader } from "@/shared/ui";
import { PositionMeta, PositionMetaWrapper } from "@/entities/position-meta";
import { Wrapper } from "@/entities/wrapper";
import { useExamplePicStore, type TExamplePicData } from "@/entities/example-picture";
import { useModalStore } from "@/shared/store";
import { useSelectExamplePic } from "../hooks/use-select-example-pic";
import {
  CLOSE_KEY,
  IMG_AFTER_KEY,
  IMG_BEFORE_KEY,
  LIST_IS_EMPTY,
  SAVE_POSITION_KEY,
  THUMB_KEY,
  UPDATED_AT_KEY
} from "@/shared/constants";
import { formatDate } from "@/shared/utils";
import type { TExampleData } from "@/entities/example";
import type { ISelectExamplePic, ISelectExamplePicModal } from "../model/types";
import styles from './select-example-pic-modal.module.css';

const SelectExamplePicModal: FC<ISelectExamplePicModal> = ({ children, data }) => {
  const { close } = useModalStore();
  const {
    data: pictures,
    fetchItems,
    isLoading,
    pagination
  } = useExamplePicStore();
  const {
    currPicType,
    currPicsData,
    isItemsLoading,
    setCurrPicType,
    handlePicsData,
    saveExampleData
  } = useSelectExamplePic();

  useEffect(() => {
    fetchItems({ perPage: 20 });
  }, []);

  return (
    <Card
      {...{
        title: "Выберите изображения",
        type: ["lg"]
      }}
    >
      <div className={styles.controllers}>
        {[{
          alt: "До",
          caption: "",
          desc: "",
          key: IMG_BEFORE_KEY
        }, {
          alt: "После",
          caption: data.name,
          desc: data.desc,
          key: IMG_AFTER_KEY
        }].map(({ alt, caption, desc, key }: {
          alt: string;
          caption: TExampleData["name"];
          desc: TExampleData["desc"];
          key: ISelectExamplePic["currPicType"];
        }) => (
          <PositionMeta
            key={key}
            {...{
              alt,
              caption,
              type: "row",
              thumb: currPicsData?.[key] || data[key][THUMB_KEY],
              isActive: currPicType === key,
              onClick: () => setCurrPicType(key)
            }}
          >
            {desc}
          </PositionMeta>
        ))}
      </div>
      <Wrapper
        {...{
          footer: (
            <>
              {children({
                fetchExamplePics: fetchItems,
                isPicsDataLoading: isLoading,
                picsPagination: pagination
              })}
              <CardRow justify="start">
                <Button
                  handleClick={() => saveExampleData(data)}
                  isDisabled={isItemsLoading}
                  style={isItemsLoading ? "plain" : "row"}
                >
                  {isItemsLoading ? <Loader isVisible={isItemsLoading} size="xs" /> : SAVE_POSITION_KEY}
                </Button>
                <Button
                  handleClick={() => close()}
                  isDisabled={isItemsLoading}
                  style="plain"
                >
                  {CLOSE_KEY}
                </Button>
              </CardRow>
            </>
          ),
          title: "Выберите изображения",
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
    </Card>
  )
};

export default SelectExamplePicModal;
