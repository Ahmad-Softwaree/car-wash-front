export type ENUM_TYPES =
  | "COOKIE_NAME"
  | "API"
  | "PAGINATION"
  | "LIMIT"
  | "DEBOUNCE"
  | "SEARCH_PARAM"
  | "ITEM_BUCKET"
  | "USER_BUCKET"
  | "CLIENT_BUCKET";

export const ENUMs: { [key in ENUM_TYPES]: key | string | number } = {
  API: import.meta.env.VITE_API_URL,

  //GLOBAL
  COOKIE_NAME: import.meta.env.VITE_COOKIE_NAME,
  SEARCH_PARAM: `search`,
  PAGINATION: 2,
  LIMIT: 10,
  DEBOUNCE: 1000,
  ITEM_BUCKET: "item",
  USER_BUCKET: "user",
  CLIENT_BUCKET: "client",
};
