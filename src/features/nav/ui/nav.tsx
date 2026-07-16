import type { FC } from "react";
import { Button } from "@/shared/ui";
import {
  routes,
  EXAMPLE_KEY,
  PAGE_CAPTIONS,
  PRICE_KEY,
  TESTIMONIAL_KEY
} from "@/shared/constants";
import styles from './nav.module.css';

const Nav: FC = () => (
  <nav className={styles.nav}>
    {[PRICE_KEY, EXAMPLE_KEY, TESTIMONIAL_KEY].map(key => (
      <Button
        key={key}
        href={routes.protected[key]}
        caption={PAGE_CAPTIONS[key]}
        style="unstyled"
      />
    ))}
  </nav>
);

export default Nav;
