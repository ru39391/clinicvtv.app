import type { ChangeEvent, FocusEvent, ReactNode } from "react";

export interface ITextFieldInput {
  defaultValue?: string;
  handleBlur?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleFocus?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isRequired?: boolean;
  isTextarea?: boolean;
  name: string;
  type?: "text" | "email" | "password";
}

export interface ITextField extends ITextFieldInput {
  handleFieldValue?: (input: HTMLInputElement | HTMLTextAreaElement | null) => void;
  children?: ReactNode;
  errorValue: string;
  icon?: ReactNode;
  isBtnVisible: boolean;
  label?: string;
}
