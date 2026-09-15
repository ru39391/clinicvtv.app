import { CAPTIONS, PRICE_KEY } from "./position";

export const IS_MIN_VALUE_KEY = "isMinValue";
export const PRICE_CAPTIONS = {
  ...CAPTIONS,
  [PRICE_KEY]: "Цена, ₽",
  [IS_MIN_VALUE_KEY]: "Минимальная цена",
}
