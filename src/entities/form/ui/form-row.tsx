import { type FC } from "react";
import { type IForm } from "../model/types";
import styles from './form.module.css';

const FormRow: FC<{ children: IForm["children"] }> = ({ children }) => <div className={styles.form__row}>{children}</div>;

export default FormRow;
