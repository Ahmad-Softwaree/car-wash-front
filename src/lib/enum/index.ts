export type ENUM_TYPES =
  //GLOBAL
  | "COOKIE_NAME"
  | "API"
  | "PAGINATION"
  | "LIMIT"
  | "DEBOUNCE"
  | "CHECK_LIMIT"

  //PARAM
  | "SEARCH_PARAM"
  | "FILTER_PARAM"
  | "DATE_PARAM"

  //FIREBASE
  | "ITEM_BUCKET"
  | "USER_BUCKET"
  | "CUSTOMER_BUCKET"

  //PARTS
  | "USERS_PART"
  | "CUSTOMER_PART"
  | "EXPENSE_PART"
  | "REPORT_PART"
  | "EXPENSE_TYPE_PART"
  | "ROLE_PART"
  | "COLOR_PART"
  | "CAR_MODEL_PART"
  | "CAR_TYPE_PART"
  | "ITEM_TYPE_PART"
  | "SERVICE_PART"
  | "DASHBOARD_PART"
  | "RESERVATION_PART"
  | "KOGA_PART"

  //SECTIONS
  | "MANAGE_SECTION"
  | "DELETED_SECTION"
  | "REPORT_SECTION"
  | "SETTING_SECTION"
  | "GENERAL_SECTION";

export const ENUMs: { [key in ENUM_TYPES]: key | string | number } = {
  //GLOBAL
  API: import.meta.env.VITE_API_URL,
  COOKIE_NAME: import.meta.env.VITE_COOKIE_NAME,
  PAGINATION: 2,
  LIMIT: 10,
  DEBOUNCE: 1000,
  CHECK_LIMIT: 30,

  //PARAM
  SEARCH_PARAM: `search`,
  FILTER_PARAM: `filter`,
  DATE_PARAM: `date`,

  //FIREBASE
  ITEM_BUCKET: "item",
  USER_BUCKET: "user",
  CUSTOMER_BUCKET: "client",

  //PARTS
  USERS_PART: "بەکارهێنەران",
  CUSTOMER_PART: "کڕیارەکان",
  EXPENSE_PART: "خەرجی",
  REPORT_PART: "ڕاپۆرتەکان",
  EXPENSE_TYPE_PART: "جۆرەکانی خەرجی",
  ROLE_PART: "ڕۆڵەکان",
  COLOR_PART: "ڕەنگەکان",
  CAR_MODEL_PART: "مۆدێلەکانی ئۆتۆمبێل",
  CAR_TYPE_PART: "جۆرەکانی ئۆتۆمبێل",
  SERVICE_PART: "خزمەتگوزاریەکان",
  ITEM_TYPE_PART: "جۆرەکانی بەرهەم",
  DASHBOARD_PART: "داشبۆرد",
  RESERVATION_PART: "نۆرەکان",
  KOGA_PART: "کۆگا",
  //SECTIONS

  MANAGE_SECTION: "بەڕێوەبردن",
  DELETED_SECTION: "سڕاوەکان",
  REPORT_SECTION: "ڕاپۆرت",
  SETTING_SECTION: "ڕێکخستن",
  GENERAL_SECTION: "گشتی",
};
