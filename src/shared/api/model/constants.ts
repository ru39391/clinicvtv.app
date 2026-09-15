export const API_URL = import.meta.env.VITE_API_URL;
export const SITE_URL = `${import.meta.env.VITE_SITE_URL || ""}/`;
export const APP_ROOT = import.meta.env.VITE_APP_ROOT || "/";

export const RESPONSE_DATA = {
  data: {},
  success: false,
  message: "Некорректный запрос",
} as const;
