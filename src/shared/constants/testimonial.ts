import { CAPTIONS, CAPTIONS_EXT } from "./position";

export const RATING_KEY = "rating";
export const TESTIMONIAL_CAPTIONS = {
  ...CAPTIONS,
  ...CAPTIONS_EXT,
  [RATING_KEY]: "Оценка"
}
