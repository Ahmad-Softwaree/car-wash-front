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
  | "ITEM_TYPE_PARAM"
  | "EXPENSE_TYPE_PARAM"
  | "USER_PARAM"
  | "FROM_PARAM"
  | "TO_PARAM"
  | "SELL_PARAM"
  | "RESERVATION_PARAM"
  | "TABLE_NAME_PARAM"
  | "ROLE_FILTER_PARAM"

  //FIREBASE
  | "ITEM_BUCKET"
  | "USER_BUCKET"
  | "CUSTOMER_BUCKET"

  //PARTS
  | "USERS_PART"
  | "CUSTOMER_PART"
  | "EXPENSE_PART"
  | "SELL_REPORT_PART"
  | "KOGA_REPORT_PART"
  | "PROFIT_REPORT_PART"
  | "EXPENSE_REPORT_PART"
  | "CASE_REPORT_PART"
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
  | "CREATE_PSULA_PART"
  | "SELL_PART"
  | "NORMAL_BACKUP_PART"
  | "SERVER_BACKUP_PART"

  //SECTIONS
  | "MANAGE_SECTION"
  | "DELETED_SECTION"
  | "REPORT_SECTION"
  | "SETTING_SECTION"
  | "GENERAL_SECTION"
  | "BACKUP_SECTION";

export const ENUMs: { [key in ENUM_TYPES]: key | string | number } = {
  //GLOBAL
  API: import.meta.env.VITE_API_URL,
  COOKIE_NAME: import.meta.env.VITE_COOKIE_NAME,
  PAGINATION: 2,
  LIMIT: 50,
  DEBOUNCE: 100,
  CHECK_LIMIT: 50,

  //PARAM
  SEARCH_PARAM: `search`,
  FILTER_PARAM: `filter`,
  ITEM_TYPE_PARAM: "item_type",
  EXPENSE_TYPE_PARAM: "expense_type",
  USER_PARAM: "user",
  FROM_PARAM: `from`,
  TO_PARAM: `to`,
  SELL_PARAM: "sell_id",
  RESERVATION_PARAM: "date_time",
  TABLE_NAME_PARAM: "table_name",
  ROLE_FILTER_PARAM: "role",

  //FIREBASE
  ITEM_BUCKET: "item",
  USER_BUCKET: "user",
  CUSTOMER_BUCKET: "client",

  //PARTS
  USERS_PART: "بەکارهێنەران",
  CUSTOMER_PART: "کڕیارەکان",
  EXPENSE_PART: "خەرجی",
  SELL_REPORT_PART: "ڕاپۆرتی فرۆشتن",
  CASE_REPORT_PART: "ڕاپۆرتی صندوق",
  PROFIT_REPORT_PART: "ڕاپۆرتی قازانج",
  EXPENSE_REPORT_PART: "ڕاپۆرتی خەرجی",
  KOGA_REPORT_PART: "ڕاپۆرتی کۆگا",

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
  CREATE_PSULA_PART: "پسولەی فرۆشتن",
  SELL_PART: "پسولەکان",
  NORMAL_BACKUP_PART: "باکئەپی ئاسایی",
  SERVER_BACKUP_PART: "باکئەپی سێرڤەر",

  //SECTIONS

  MANAGE_SECTION: "بەڕێوەبردن",
  DELETED_SECTION: "سڕاوەکان",
  REPORT_SECTION: "ڕاپۆرت",
  SETTING_SECTION: "ڕێکخستن",
  GENERAL_SECTION: "گشتی",
  BACKUP_SECTION: "باکئەپ",
};
