import type { FocusEvent, ChangeEvent } from "react";
import type { TInputField, TInputItem } from "@/shared/types";

export type TInputErrors = Partial<Record<string, string>>;

export type TPwdData = Partial<Record<string, string>>;

export type TValidateForm = Record<"validateEmailField" |
  "validatePlainPwdField", (event: FocusEvent<HTMLInputElement, Element>) => void>
  & Record<"validateNumberField" |
  "validatePlainField", (event: FocusEvent<TInputItem, Element>) => void>
  & Record<"validateConfirmPwdField",
  (event: ChangeEvent<HTMLInputElement>) => void
  > & {
  inputErrors: TInputErrors;
  isBtnDisabled: boolean;
  pwdData: TPwdData;
  validatePwdField: (event: FocusEvent<HTMLInputElement, Element> | ChangeEvent<HTMLInputElement>) => void;
  resetFieldValue: (input: TInputField) => void;
  unsetInvalidData: (event: ChangeEvent<TInputItem>) => void;
  togglePwdField: (input: HTMLInputElement | null) => void;
};
