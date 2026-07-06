import { type FC } from "react";
import { Form, FormRow } from "@/entities/form";
import { Button, Checkbox, TextField, Loader } from "@/shared/ui";
import { CloseIcon } from "@/shared/icons";
import { useExampleStore } from "@/entities/example";
import { useValidateForm } from "@/shared/hooks";
import { useCreateExampleItem } from "../hooks/use-create-example-item-form";
import {
  ADD_POSITION_KEY,
  EDIT_POSITION_KEY,
  POSITION_KEY,
  EXAMPLE_CAPTIONS,
  NAME_KEY,
  DESC_KEY,
  RATING_KEY,
  IS_HIDDEN_KEY,
} from "@/shared/constants";

const CreateExampleItemForm: FC = () => {
  const { formState, dispatchForm, isPending } = useCreateExampleItem();
  const { current: currExampleData } = useExampleStore();
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
      title={`${currExampleData ? EDIT_POSITION_KEY : ADD_POSITION_KEY} ${POSITION_KEY}`}
      isLogoVisible={false}
      mod={["md", "grid"]}
    >
      {[
        {
          name: NAME_KEY,
          label: EXAMPLE_CAPTIONS[NAME_KEY],
          defaultValue: formState?.values?.[NAME_KEY] || currExampleData?.[NAME_KEY] || "",
        },
        {
          name: DESC_KEY,
          label: EXAMPLE_CAPTIONS[DESC_KEY],
          defaultValue: formState?.values?.[DESC_KEY] || currExampleData?.[DESC_KEY] || "",
          isTextarea: true
        }
      ].map(({
        defaultValue,
        isTextarea,
        label,
        name
      }) => (
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
      ))}
      {[
        {
          name: IS_HIDDEN_KEY,
          caption: EXAMPLE_CAPTIONS[IS_HIDDEN_KEY],
          isChecked: formState?.values?.[IS_HIDDEN_KEY] || currExampleData?.[IS_HIDDEN_KEY] || false,
        },
      ].map(({
        caption,
        isChecked,
        name
      }) => (
        <Checkbox key={name} {...{ caption, name, isChecked }} />
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

export default CreateExampleItemForm;
