import { useEffect, type FC } from "react";
import { FormRow } from "@/entities/form";
import { Loader, SelectField } from "@/shared/ui";
import { TESTIMONIAL_CAPTIONS, SPEC_ID_KEY } from "@/shared/constants";
import { useTeamStore, type TTeamData } from "@/entities/team";

const SpecSelectField: FC = () => {
  const {
    data,
    fetchItems,
    isLoading
  } = useTeamStore();

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    !isLoading && data.length
      ? <FormRow>
          <SelectField
            {...{
              isRequired: true,
              label: TESTIMONIAL_CAPTIONS[SPEC_ID_KEY],
              name: SPEC_ID_KEY,
              options: data.map(({ id, pagetitle: value }: TTeamData) => ({ id: id.toString(), value }))
            }}
          />
        </FormRow>
      : ""
  )
};

export default SpecSelectField;
