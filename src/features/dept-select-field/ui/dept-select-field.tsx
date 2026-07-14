import { type FC } from "react";
import { FormRow } from "@/entities/form";
import { SelectField } from "@/shared/ui";
import { CAPTIONS, DEPT_ID_KEY } from "@/shared/constants";
import type { TDeptData } from "@/entities/dept";

const DeptSelectField: FC<{
  current?: number;
  depts: TDeptData[];
  isLoading: boolean;
}> = ({
  current,
  depts,
  isLoading
}) => {
  if (!isLoading && !depts.length) {
    return "";
  }

  return (
    <FormRow>
      <SelectField
        {...{
          current,
          isRequired: true,
          label: CAPTIONS[DEPT_ID_KEY],
          name: DEPT_ID_KEY,
          options: depts.map(({ id, ...data }: TDeptData) => ({ id: id.toString(), value: data.pagetitle }))
        }}
      />
    </FormRow>
  )
};

export default DeptSelectField;
