import { useState } from "react";
import { useModalStore } from "@/shared/store";
import { useNotificationStore } from "@/shared/store";
import {
  NAME_KEY,
  DESC_KEY,
  EDIT_POSITION_SUCCEED,
  IS_HIDDEN_KEY,
  SPEC_ID_KEY,
  DEPT_ID_KEY,
  IMG_AFTER_KEY,
  IMG_BEFORE_KEY
} from "@/shared/constants";
import { useExampleStore, type TExampleData, type TExamplePayload } from "@/entities/example";
import type { ISelectExamplePic } from "../model/types";

export const useSelectExamplePic = (): ISelectExamplePic => {
  const [currPicType, setCurrPicType] = useState<ISelectExamplePic["currPicType"]>(IMG_BEFORE_KEY);
  const [currPicsData, setCurrPicsData] = useState<ISelectExamplePic["currPicsData"]>(null);
  const { add: addNotification } = useNotificationStore();
  const { close: closeModal } = useModalStore();
  const { isLoading: isItemsLoading, updateItem } = useExampleStore();
  const keys: (keyof TExamplePayload)[] = [
    NAME_KEY,
    DESC_KEY,
    IS_HIDDEN_KEY,
    SPEC_ID_KEY,
    DEPT_ID_KEY
  ];

  const handlePicsData = (data: Record<typeof IMG_BEFORE_KEY | typeof IMG_AFTER_KEY, string>) => {
    if(!currPicsData) {
      setCurrPicsData(data);
      return;
    }

    setCurrPicsData({ ...currPicsData, ...data });
  }

  const saveExampleData = async (data: TExampleData) => {
    if(currPicsData ? Object.values(currPicsData).length === 1 : !currPicsData) {
      addNotification({ title: "Проверьте, все ли изображения выбраны" });
      return;
    }

    const payload = keys.reduce(
      (acc, key) => ({...acc, [key]: data[key]}),
      {} as TExamplePayload
    );

    const success = await updateItem({ ...payload, ...currPicsData, id: data.id });

    if(success) {
      closeModal();
      addNotification({ title: EDIT_POSITION_SUCCEED, type: "success" });
    }
  }

  return {
    currPicType,
    currPicsData,
    isItemsLoading,
    setCurrPicType,
    handlePicsData,
    saveExampleData
  };
};
