import type { ChangeEvent, FocusEvent, ReactNode } from "react";
import type { TInputField, TInputItem } from "@/shared/types";

export interface ITextFieldInput {
  defaultValue?: string;
  handleBlur?: (event: FocusEvent<TInputItem>) => void;
  handleChange?: (event: ChangeEvent<TInputItem>) => void;
  handleFocus?: (event: FocusEvent<TInputItem>) => void;
  isRequired?: boolean;
  isTextarea?: boolean;
  name: string;
  type?: "text" | "email" | "password";
}

export interface ITextField extends ITextFieldInput {
  handleFieldValue?: (input: TInputField) => void;
  children?: ReactNode;
  errorValue: string;
  icon?: ReactNode;
  isBtnVisible: boolean;
  label?: string;
}
