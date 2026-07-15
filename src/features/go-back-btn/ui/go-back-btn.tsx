import { type FC } from "react";
import { LogoutIcon } from "@/shared/icons";
import { Button } from "@/shared/ui";
import { SITE_URL } from "@/shared/api";

const GoBackBtn: FC = () => (
  <Button
    href={`${SITE_URL}manager`}
    caption="Назад в CMS"
    style="row"
  >
    <LogoutIcon />
  </Button>
);

export default GoBackBtn;
