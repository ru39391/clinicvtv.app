import { type FC } from "react";
import { Form } from "@/entities/form";
import { Button, Checkbox, TextField, Loader } from "@/shared/ui";
import { CloseIcon } from "@/shared/icons";
import { usePricelistStore } from "@/entities/pricelist";
import { useValidateForm } from "@/shared/hooks";
import { useCreatePriceItem } from "../hooks/use-create-price-item";
import {
  ADD_POSITION_KEY,
  EDIT_POSITION_KEY,
  POSITION_KEY,
  PRICE_CAPTIONS,
  NAME_KEY,
  PRICE_KEY,
  IS_HIDDEN_KEY,
  IS_MIN_VALUE_KEY,
} from "@/shared/constants";
import styles from "./create-price-item-form.module.css";

const CreatePriceItemForm: FC = () => {
  const { formState, dispatchForm, isPending } = useCreatePriceItem();
  const { current: currPriceItem } = usePricelistStore();
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
      title={`${currPriceItem ? EDIT_POSITION_KEY : ADD_POSITION_KEY} ${POSITION_KEY}`}
      isLogoVisible={false}
      mod={["md", "grid"]}
    >
      {[
        {
          name: NAME_KEY,
          label: PRICE_CAPTIONS[NAME_KEY],
          defaultValue: formState?.values?.[NAME_KEY] || currPriceItem?.[NAME_KEY] || "",
        },
        {
          name: PRICE_KEY,
          label: PRICE_CAPTIONS[PRICE_KEY],
          defaultValue: formState?.values?.[PRICE_KEY] || String(currPriceItem?.[PRICE_KEY] || ""),
        },
      ].map(({
        defaultValue,
        label,
        name
      }) => (
        <TextField
          key={name}
          isRequired
          {...{
            defaultValue,
            errorValue: inputErrors[name] || "",
            isBtnVisible:  inputErrors[name] !== undefined,
            name,
            label,
            type: "text",
            handleBlur: [PRICE_KEY].includes(name) ? validateNumberField : validatePlainField,
            handleChange: unsetInvalidData,
            handleFieldValue: (input: HTMLInputElement | null) => resetFieldValue(input)
          }}
        >
          <CloseIcon />
        </TextField>
      ))}
      {[
        {
          name: IS_HIDDEN_KEY,
          caption: PRICE_CAPTIONS[IS_HIDDEN_KEY],
          isChecked: formState?.values?.[IS_HIDDEN_KEY] || currPriceItem?.[IS_HIDDEN_KEY] || false,
        },
        {
          name: IS_MIN_VALUE_KEY,
          caption: PRICE_CAPTIONS[IS_MIN_VALUE_KEY],
          isChecked: formState?.values?.[IS_MIN_VALUE_KEY] || currPriceItem?.[IS_MIN_VALUE_KEY] || false,
        },
      ].map(({
        caption,
        isChecked,
        name
      }) => (
        <Checkbox key={name} {...{ caption, name, isChecked }} />
      ))}
      <div className={styles.row}>
        <Button
          caption={!isPending ? "Сохранить" : ""}
          isDisabled={isPending || isBtnDisabled}
          type="submit"
        >
          <Loader isVisible={isPending} size="xs" />
        </Button>
      </div>
    </Form>
  )
};

export default CreatePriceItemForm;
