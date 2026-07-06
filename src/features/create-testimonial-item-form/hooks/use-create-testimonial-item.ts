import { useActionState } from "react";
import { useModalStore, useNotificationStore, type TNotification } from "@/shared/store";
import { useTestimonialStore, type TTestimonialData, type TTestimonialPayload } from "@/entities/testimonial";
import type { TFormHandler, TFormState } from "@/shared/types";
import {
  ADD_POSITION_SUCCEED,
  IS_HIDDEN_KEY,
  RATING_KEY,
  SPEC_ID_KEY
} from "@/shared/constants";

export const useCreateTestimonialItem = (): TFormHandler<TTestimonialPayload> => {
  const { close: closeModal } = useModalStore();
  const { add: addNotification } = useNotificationStore();
  const {
    current: currTestimonialData,
    createItem,
    setCurrItemData,
    updateItem
  } = useTestimonialStore();

  const hidePopups = (data: Omit<TNotification, "id" | "createdAt">) => {
    closeModal();
    setCurrItemData(null);

    if(data) addNotification(data);
  }

  const updateItemData = async (data: TTestimonialPayload): Promise<boolean> => {
    const isValueDataEqual = Object.entries(data).reduce(
      (acc, [key, value]) => currTestimonialData === null ? !acc : acc && currTestimonialData[key as keyof TTestimonialPayload] === value,
      true
    );

    if(isValueDataEqual) {
      addNotification({ title: "Вы пытаетесь сохранить текущие данные" });

      return !isValueDataEqual;
    };

    return await updateItem({ ...( currTestimonialData && { ...currTestimonialData }), ...data } as TTestimonialData);
  }

  const submitForm = () => async (
    _: unknown,
    formData: FormData
  ): Promise<TFormState<TTestimonialPayload>> => {
    const formValues = Object.fromEntries(formData);
    const values = {
      [RATING_KEY]: Number(currTestimonialData?.[RATING_KEY]) || 5,
      [SPEC_ID_KEY]: Number(currTestimonialData?.[SPEC_ID_KEY]) || 0,
      [IS_HIDDEN_KEY]: Boolean(formValues[IS_HIDDEN_KEY]),
    };
    const payload = {
      ...formValues,
      [RATING_KEY]: Number(formValues[RATING_KEY]) || values[RATING_KEY],
      [SPEC_ID_KEY]: Number(formValues[SPEC_ID_KEY]) || values[SPEC_ID_KEY],
      [IS_HIDDEN_KEY]: Number(values[IS_HIDDEN_KEY])
    } as TTestimonialPayload;

    const success = currTestimonialData
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
