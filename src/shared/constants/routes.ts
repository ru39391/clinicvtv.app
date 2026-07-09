import { EXAMPLE_KEY, EXAMPLE_PIC_KEY, PRICE_KEY, TESTIMONIAL_KEY } from "./position";

export const routes = {
  protected: {
    [EXAMPLE_KEY]: "/examples",
    [PRICE_KEY]: "/price",
    [TESTIMONIAL_KEY]: "/testimonials",
  },
  api: {
    [EXAMPLE_KEY]: "/examples",
    [PRICE_KEY]: "/pricelist",
    team: "/team",
    [EXAMPLE_PIC_KEY]: "/examplepics",
    [TESTIMONIAL_KEY]: "/testimonials",
  },
} as const;

export const QUERY_KEY = "query";
