import type { FC } from "react";
import { Button } from "@/shared/ui";
import {
  routes,
  EXAMPLE_KEY,
  PRICE_KEY,
  TESTIMONIAL_KEY
} from "@/shared/constants";
//import styles from './nav.module.css';

const Nav: FC = () => (
  [PRICE_KEY, EXAMPLE_KEY, TESTIMONIAL_KEY].map(key => (
    <Button
      key={key}
      href={routes.protected[key]}
      caption={key}
      style="plain"
    />
  ))
);

export default Nav;
