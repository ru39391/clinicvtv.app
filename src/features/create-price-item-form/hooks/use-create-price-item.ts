import { useActionState } from "react";
import { useModalStore, useNotificationStore, type TNotification } from "@/shared/store";
import { usePricelistStore, type TPricelistData, type TPricelistPayload } from "@/entities/pricelist";
import type { TFormHandler, TFormState } from "@/shared/types";
import {
  ADD_POSITION_SUCCEED,
  PRICE_KEY,
  IS_HIDDEN_KEY,
  IS_MIN_VALUE_KEY,
  DEPT_ID_KEY,
  SUBDEPT_ID_KEY
} from "@/shared/constants";

export const useCreatePriceItem = (): TFormHandler<{ [k: string]: FormDataEntryValue; }> => {
  const { close: closeModal } = useModalStore();
  const { add: addNotification } = useNotificationStore();
  const {
    current: currPriceItem,
    createItem,
    setCurrItemData,
    updateItem
  } = usePricelistStore();

  const hidePopups = (data: Omit<TNotification, "id" | "createdAt">) => {
    closeModal();
    setCurrItemData(null);

    if(data) addNotification(data);
  }

  const updatePriceItemData = async (data: TPricelistPayload): Promise<boolean> => {
    const isValueDataEqual = Object.entries(data).reduce(
      (acc, [key, value]) => currPriceItem === null ? !acc : acc && currPriceItem[key as keyof TPricelistPayload] === value,
      true
    );

    if(isValueDataEqual) {
      addNotification({ title: "Вы пытаетесь сохранить текущие данные" });

      return !isValueDataEqual;
    };

    return await updateItem({ ...( currPriceItem && { ...currPriceItem }), ...data } as TPricelistData);
  }

  const submitForm = () => async (
    _: unknown,
    formData: FormData
  ): Promise<TFormState<{ [k: string]: FormDataEntryValue; }>> => {
    const formValues = Object.fromEntries(formData);
    const values = {
      [DEPT_ID_KEY]: Number(currPriceItem?.[DEPT_ID_KEY]) || 0,
      [IS_HIDDEN_KEY]: Boolean(formValues[IS_HIDDEN_KEY]),
      [IS_MIN_VALUE_KEY]: Boolean(formValues[IS_MIN_VALUE_KEY]),
    };
    const payload = {
      ...formValues,
      [PRICE_KEY]: Number(formValues[PRICE_KEY]),
      [DEPT_ID_KEY]: Number(formValues[DEPT_ID_KEY]) || values[DEPT_ID_KEY],
      [IS_HIDDEN_KEY]: Number(values[IS_HIDDEN_KEY]),
      [IS_MIN_VALUE_KEY]: Number(values[IS_MIN_VALUE_KEY]),
      [SUBDEPT_ID_KEY]: 0
    } as TPricelistPayload;

    const success = currPriceItem
      ? await updatePriceItemData(payload)
      : await createItem(payload);

    if (success) {
      hidePopups({ title: ADD_POSITION_SUCCEED, type: "success" });
    }

    return {
      ...(!success && { values: formValues })
    };
  };

  const [formState, dispatchForm, isPending] = useActionState(submitForm(), {});

  return {
    formState,
    dispatchForm,
    isPending,
  };
};
