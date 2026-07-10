import { useState } from "react";
//import { useModalStore } from "@/shared/store";
//import { useNotificationStore } from "@/shared/store";
import { IMG_BEFORE_KEY } from "@/shared/constants";
import type { ISelectExamplePic } from "../model/types";

export const useSelectExamplePic = (): ISelectExamplePic => {
  const [currPicType, setCurrPicType] = useState<ISelectExamplePic["currPicType"]>(IMG_BEFORE_KEY);
  const [currPicsData, setCurrPicsData] = useState<ISelectExamplePic["currPicsData"]>(null);

  const handlePicsData = (data: Record<typeof IMG_BEFORE_KEY | typeof IMG_AFTER_KEY, string>) => {
    if(!currPicsData) {
      setCurrPicsData(data);
      return;
    }

    setCurrPicsData({ ...currPicsData, ...data });
  }

  return {
    currPicType,
    currPicsData,
    setCurrPicType,
    handlePicsData
  };
};
