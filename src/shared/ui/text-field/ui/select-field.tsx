import { forwardRef, useRef, type FC, type ForwardedRef } from "react";
import type { IOptionsList, ISelectField } from "../model/types";
import styles from './text-field.module.css';

const OptionsList = forwardRef<HTMLSelectElement, IOptionsList>(({
  isDisabled,
  handleBlur,
  handleChange,
  handleFocus,
  isRequired,
  name,
  options
}, ref) => {
  const props = {
    id: name,
    name,
    className: `${styles.field__input} ${styles.field__label}`,
    ...(isDisabled && { disabled: isDisabled }),
    ...(handleBlur && { onBlur: handleBlur }),
    ...(handleChange && { onChange: handleChange }),
    ...(handleFocus && { onFocus: handleFocus }),
    ...(isRequired && { required: isRequired })
  }

  return (
    <select
      {...props}
      ref={ref as ForwardedRef<HTMLSelectElement>}
    >
      {options.map(({ id, value }) => <option key={id} value={id}>{value}</option>)}
    </select>
  );
});

const SelectField: FC<ISelectField> = ({
  errorValue,
  handleBlur,
  handleChange,
  handleFocus,
  icon,
  isDisabled,
  isRequired,
  label,
  name,
  options
}) => {
  const optionsRef = useRef<HTMLSelectElement | null>(null);
  const fieldClassName = errorValue ? `${styles.field} ${styles.field_type_error}` : styles.field;
  const rowClassName = icon ? `${styles.field__row} ${styles.field__row_offset_y}` : styles.field__row;
  const optionsList = (
    <OptionsList
      ref={optionsRef}
      {...{
        isDisabled,
        handleBlur,
        handleChange,
        handleFocus,
        isRequired,
        name,
        options
      }}
    />
  );

  return (
    <div className={fieldClassName}>
      {Boolean(label) && <label className={styles.field__label}>{label}</label>}
      <div className={rowClassName}>
        {icon ? (<><div className={styles.field__icon}>{icon}</div>{optionsList}</>) : optionsList}
        <div className={styles.field__error}>{errorValue}</div>
      </div>
    </div>
  )
};

export default SelectField;
