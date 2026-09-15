import { type FC } from "react";
import { LogoutIcon } from "@/shared/icons";
import { Button } from "@/shared/ui";
import { SITE_URL } from "@/shared/api";
import styles from './go-back-btn.module.css';

const GoBackBtnCaption: FC = () => <span className={styles.caption}>Назад в CMS</span>;

const GoBackBtn: FC = () => (
  <Button
    href={`${SITE_URL}manager`}
    caption={<GoBackBtnCaption />}
    style="row"
    target="_blank"
  >
    <LogoutIcon />
  </Button>
);

export default GoBackBtn;
