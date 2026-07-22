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
    dept: "/depts",
    [EXAMPLE_PIC_KEY]: "/pictures",
    [TESTIMONIAL_KEY]: "/testimonials",
  },
} as const;

export const PAGE_CAPTIONS = {
  [EXAMPLE_KEY]: "Примеры работ",
  [PRICE_KEY]: "Прайслист",
  [TESTIMONIAL_KEY]: "Отзывы",
}

export const QUERY_KEY = "query";
