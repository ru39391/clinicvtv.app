import { type FC } from "react";
import { Form, FormRow } from "@/entities/form";
import { Button, Checkbox, TextField, Loader } from "@/shared/ui";
import { CloseIcon } from "@/shared/icons";
import { useTestimonialStore } from "@/entities/testimonial";
import { useValidateForm } from "@/shared/hooks";
import { useCreateTestimonialItem } from "../hooks/use-create-testimonial-item";
import {
  ADD_POSITION_KEY,
  EDIT_POSITION_KEY,
  POSITION_KEY,
  TESTIMONIAL_CAPTIONS,
  NAME_KEY,
  DESC_KEY,
  RATING_KEY,
  IS_HIDDEN_KEY,
} from "@/shared/constants";

const CreateTestimonialItemForm: FC = () => {
  const { formState, dispatchForm, isPending } = useCreateTestimonialItem();
  const { current: currTestimonialData } = useTestimonialStore();
  const {
    inputErrors,
    isBtnDisabled,
    resetFieldValue,
    validateNumberField,
    validatePlainField,
    unsetInvalidData
  } = useValidateForm();

  return (
    <Form
      action={dispatchForm}
      title={`${currTestimonialData ? EDIT_POSITION_KEY : ADD_POSITION_KEY} ${POSITION_KEY}`}
      isLogoVisible={false}
      mod={["md", "grid"]}
      type="grid"
    >
      {[
        {
          name: NAME_KEY,
          label: TESTIMONIAL_CAPTIONS[NAME_KEY],
          defaultValue: formState?.values?.[NAME_KEY] || currTestimonialData?.[NAME_KEY] || "",
        },
        {
          name: RATING_KEY,
          label: TESTIMONIAL_CAPTIONS[RATING_KEY],
          defaultValue: formState?.values?.[RATING_KEY] || String(currTestimonialData?.[RATING_KEY] || ""),
        },
        {
          name: DESC_KEY,
          label: TESTIMONIAL_CAPTIONS[DESC_KEY],
          defaultValue: formState?.values?.[DESC_KEY] || currTestimonialData?.[DESC_KEY] || "",
          isTextarea: true
        }
      ].map(({
        defaultValue,
        isTextarea,
        label,
        name
      }) => {
        const textField = (
          <TextField
            key={name}
            isRequired
            {...{
              defaultValue,
              isTextarea,
              errorValue: inputErrors[name] || "",
              isBtnVisible:  inputErrors[name] !== undefined,
              name,
              label,
              type: "text",
              handleBlur: [RATING_KEY].includes(name) ? validateNumberField : validatePlainField,
              handleChange: unsetInvalidData,
              handleFieldValue: (input: HTMLInputElement | null) => resetFieldValue(input),
            }}
          >
            <CloseIcon />
          </TextField>
        );

        return isTextarea ? <FormRow key={name}>{textField}</FormRow> : textField;
      })}
      {[
        {
          name: IS_HIDDEN_KEY,
          caption: TESTIMONIAL_CAPTIONS[IS_HIDDEN_KEY],
          isChecked: formState?.values?.[IS_HIDDEN_KEY] || currTestimonialData?.[IS_HIDDEN_KEY] || false,
        },
      ].map(({
        caption,
        isChecked,
        name
      }) => (
        <Checkbox key={name} {...{ caption, name, isChecked: Boolean(isChecked) }} />
      ))}
      <FormRow>
        <Button
          caption={!isPending ? "Сохранить" : ""}
          isDisabled={isPending || isBtnDisabled}
          type="submit"
        >
          <Loader isVisible={isPending} size="xs" />
        </Button>
      </FormRow>
    </Form>
  )
};

export default CreateTestimonialItemForm;
