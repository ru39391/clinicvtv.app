import { useEffect, type FC } from "react";
import { FormRow } from "@/entities/form";
import { SelectField } from "@/shared/ui";
import { CAPTIONS_EXT, SPEC_ID_KEY } from "@/shared/constants";
import { useTeamStore, type TTeamData } from "@/entities/team";

const SpecSelectField: FC<{ current?: number; }> = ({ current }) => {
  const {
    data,
    fetchItems,
    isLoading
  } = useTeamStore();

  useEffect(() => {
    fetchItems(null);
  }, []);

  if (!isLoading && !data.length) {
    return "";
  }

  return (
    <FormRow>
      <SelectField
        {...{
          current,
          errorValue: "",
          isRequired: true,
          label: CAPTIONS_EXT[SPEC_ID_KEY],
          name: SPEC_ID_KEY,
          options: data.map(({ id, ...data }: TTeamData) => ({ id: id.toString(), value: data.pagetitle }))
        }}
      />
    </FormRow>
  )
};

export default SpecSelectField;
