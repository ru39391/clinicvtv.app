import { CREATED_AT_KEY, UPDATED_AT_KEY } from "../constants";

export const formatCurrency = (v: number | string | null | undefined) => {
  if (v == null || v === "") return "—";
  const num = typeof v === "string" ? Number(v) : v;
  if (!Number.isFinite(num)) return String(v);
  return new Intl.NumberFormat("ru-RU").format(num);// + " ₽";
};

export const formatDate = (value: string, key: string, isTimeVisible: boolean = false) => {
  if(![CREATED_AT_KEY, UPDATED_AT_KEY].includes(key)) {
    return value;
  }

  const date = new Date(value);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const timeValue = isTimeVisible ? ` в ${hours}:${minutes}:${seconds}` : "";

  return `${day}.${month}.${date.getUTCFullYear()} г.${timeValue}`;
};

export const setStrId = (): string => Math.random().toString(36).substring(2, 9);

export const setItemHiddenCaption = (value: boolean | number | string): string => Number(value) ? "Да" : "Нет";
