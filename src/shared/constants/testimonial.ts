import { CAPTIONS, CAPTIONS_EXT, NAME_KEY } from "./position";

export const RATING_KEY = "rating";
export const TESTIMONIAL_CAPTIONS = {
  ...CAPTIONS,
  ...CAPTIONS_EXT,
  [NAME_KEY]: "Имя",
  [RATING_KEY]: "Оценка"
}
