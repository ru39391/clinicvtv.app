export const routes = {
  protected: {
    examples: "/examples",
    price: "/price",
    testimonials: "/testimonials",
  },
  api: {
    examples: "/examples",
    price: "/pricelist",
    team: "/team",
    testimonials: "/testimonials",
  },
} as const;

export const QUERY_KEY = "query";
