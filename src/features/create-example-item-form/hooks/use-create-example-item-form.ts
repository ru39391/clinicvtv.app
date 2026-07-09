import { useActionState } from "react";
import { useModalStore, useNotificationStore, type TNotification } from "@/shared/store";
import { useExampleStore, type TExamplePayload } from "@/entities/example";
import type { TFormHandler, TFormState } from "@/shared/types";
import {
  ADD_POSITION_SUCCEED,
  DEPT_ID_KEY,
  DESC_KEY,
  IS_HIDDEN_KEY,
  NAME_KEY,
  POSITION_EXISTS,
  SPEC_ID_KEY,
  SUBDEPT_ID_KEY
} from "@/shared/constants";

export const useCreateExampleItem = (): TFormHandler<{ [k: string]: FormDataEntryValue; }> => {
  const { close: closeModal } = useModalStore();
  const { add: addNotification } = useNotificationStore();
  const {
    current: currExampleData,
    createItem,
    setCurrItemData,
    updateItem
  } = useExampleStore();
  const keys: (keyof TExamplePayload)[] = [
    NAME_KEY,
    DESC_KEY,
    IS_HIDDEN_KEY,
    SPEC_ID_KEY,
    DEPT_ID_KEY
  ];

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
    const payload = !currExampleData ? data : keys.reduce(
      (acc, key) => acc[key] === undefined ? ({...acc, [key]: {...currExampleData, ...data}[key]}) : acc,
      {} as TExamplePayload
    );

    if(isValueDataEqual) {
      addNotification({ title: POSITION_EXISTS });

      return !isValueDataEqual;
    };

    return await updateItem(payload);
  }

  const submitForm = () => async (
    _: unknown,
    formData: FormData
  ): Promise<TFormState<{ [k: string]: FormDataEntryValue; }>> => {
    const formValues = Object.fromEntries(formData);
    const values = {
      [DEPT_ID_KEY]: Number(currExampleData?.[DEPT_ID_KEY]) || 0,
      [SPEC_ID_KEY]: Number(currExampleData?.[SPEC_ID_KEY]) || 0,
      [IS_HIDDEN_KEY]: Boolean(formValues[IS_HIDDEN_KEY]),
    };
    const payload = {
      ...formValues,
      [DEPT_ID_KEY]: Number(formValues[DEPT_ID_KEY]) || values[DEPT_ID_KEY],
      [SPEC_ID_KEY]: Number(formValues[SPEC_ID_KEY]) || values[SPEC_ID_KEY],
      [IS_HIDDEN_KEY]: Number(values[IS_HIDDEN_KEY]),
      [SUBDEPT_ID_KEY]: 0
    } as TExamplePayload;

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
