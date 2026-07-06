import { useActionState } from "react";
import { useModalStore, useNotificationStore, type TNotification } from "@/shared/store";
import { useExampleStore, type TExampleData, type TExamplePayload } from "@/entities/example";
import type { TFormHandler, TFormState } from "@/shared/types";
import {
  ADD_POSITION_SUCCEED,
  IS_HIDDEN_KEY,
  SPEC_ID_KEY,
  SUBDEPT_ID_KEY
} from "@/shared/constants";

export const useCreateExampleItem = (): TFormHandler<TExamplePayload> => {
  const { close: closeModal } = useModalStore();
  const { add: addNotification } = useNotificationStore();
  const {
    current: currExampleData,
    createItem,
    setCurrItemData,
    updateItem
  } = useExampleStore();

  const hidePopups = (data: Omit<TNotification, "id" | "createdAt">) => {
    closeModal();
    setCurrItemData(null);

    if(data) addNotification(data);
  }

  const updateItemData = async (data: TExamplePayload): Promise<boolean> => {
    const isValueDataEqual = Object.entries(data).reduce(
      (acc, [key, value]) => currExampleData === null ? !acc : acc && currExampleData[key as keyof TExamplePayload] === value,
      true
    );

    if(isValueDataEqual) {
      addNotification({ title: "Вы пытаетесь сохранить текущие данные" });

      return !isValueDataEqual;
    };

    return await updateItem({ ...( currExampleData && { ...currExampleData }), ...data } as TExampleData);
  }

  const submitForm = () => async (
    _: unknown,
    formData: FormData
  ): Promise<TFormState<TExamplePayload>> => {
    const formValues = Object.fromEntries(formData);
    const values = {
      [SPEC_ID_KEY]: Number(currExampleData?.[SPEC_ID_KEY]) || 0,
      [IS_HIDDEN_KEY]: Boolean(formValues[IS_HIDDEN_KEY]),
    };
    const payload = {
      ...formValues,
      [SPEC_ID_KEY]: Number(formValues[SPEC_ID_KEY]) || values[SPEC_ID_KEY],
      [IS_HIDDEN_KEY]: Number(values[IS_HIDDEN_KEY]),
      [SUBDEPT_ID_KEY]: 0
    } as TExamplePayload;

    // TODO: реализовать проверку payload - удалить лишние данные по ключам из TExamplePayload (для других типов данных тоже)
    const success = currExampleData
      ? await updateItemData(payload)
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
