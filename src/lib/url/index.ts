import { ENUMs } from "../enum";
const API = ENUMs.API;
export type URLS =
  //USER
  | "GET_USERS"
  | "GET_DELETED_USERS"
  | "GET_USERS_SELECTION"
  | "RESTORE_USER"
  | "SEARCH_DELETED_USERS"
  | "SEARCH_USERS"
  | "ADD_USER"
  | "UPDATE_USER"
  | "DELETE_USER"

  //CUSTOMER
  | "GET_CUSTOMERS"
  | "GET_CUSTOMERS_SELECTION"
  | "ADD_CUSTOMER"
  | "UPDATE_CUSTOMER"
  | "DELETE_CUSTOMER"
  | "GET_DELETED_CUSTOMERS"
  | "RESTORE_CUSTOMER"
  | "SEARCH_DELETED_CUSTOMERS"
  | "SEARCH_CUSTOMERS"

  //EXPENSE
  | "GET_EXPENSES"
  | "ADD_EXPENSE"
  | "UPDATE_EXPENSE"
  | "DELETE_EXPENSE"
  | "GET_DELETED_EXPENSES"
  | "RESTORE_EXPENSE"
  | "SEARCH_DELETED_EXPENSES"
  | "SEARCH_EXPENSES"

  //ROLE
  | "GET_ROLES"
  | "GET_ROLES_SELECTION"
  | "ADD_ROLE"
  | "UPDATE_ROLE"
  | "DELETE_ROLE"
  | "GET_DELETED_ROLES"
  | "RESTORE_ROLE"
  | "SEARCH_DELETED_ROLES"
  | "SEARCH_ROLES"
  //COLOR
  | "GET_COLORS_SELECTION"
  | "GET_COLORS"
  | "ADD_COLOR"
  | "UPDATE_COLOR"
  | "DELETE_COLOR"
  | "GET_DELETED_COLORS"
  | "RESTORE_COLOR"
  | "SEARCH_DELETED_COLORS"
  | "SEARCH_COLORS"

  //CAR_MODEL
  | "GET_CAR_MODELS_SELECTION"
  | "GET_CAR_MODELS"
  | "ADD_CAR_MODEL"
  | "UPDATE_CAR_MODEL"
  | "DELETE_CAR_MODEL"
  | "GET_DELETED_CAR_MODELS"
  | "RESTORE_CAR_MODEL"
  | "SEARCH_DELETED_CAR_MODELS"
  | "SEARCH_CAR_MODELS"
  //CAR_TYPE
  | "GET_CAR_TYPES_SELECTION"
  | "GET_CAR_TYPES"
  | "ADD_CAR_TYPE"
  | "UPDATE_CAR_TYPE"
  | "DELETE_CAR_TYPE"
  | "GET_DELETED_CAR_TYPES"
  | "RESTORE_CAR_TYPE"
  | "SEARCH_DELETED_CAR_TYPES"
  | "SEARCH_CAR_TYPES"
  //ITEM_TYPE
  | "GET_ITEM_TYPES"
  | "GET_ITEM_TYPES_SELECTED"
  | "ADD_ITEM_TYPE"
  | "UPDATE_ITEM_TYPE"
  | "DELETE_ITEM_TYPE"
  | "GET_DELETED_ITEM_TYPES"
  | "RESTORE_ITEM_TYPE"
  | "SEARCH_DELETED_ITEM_TYPES"
  | "SEARCH_ITEM_TYPES"
  //SERVICE
  | "GET_SERVICES_SELECTION"
  | "GET_SERVICES"
  | "ADD_SERVICE"
  | "UPDATE_SERVICE"
  | "DELETE_SERVICE"
  | "GET_DELETED_SERVICES"
  | "RESTORE_SERVICE"
  | "SEARCH_DELETED_SERVICES"
  | "SEARCH_SERVICES"
  //EXPENSE_TYPE
  | "GET_EXPENSE_TYPES_SELECTION"
  | "GET_EXPENSE_TYPES"
  | "ADD_EXPENSE_TYPE"
  | "UPDATE_EXPENSE_TYPE"
  | "DELETE_EXPENSE_TYPE"
  | "GET_DELETED_EXPENSE_TYPES"
  | "RESTORE_EXPENSE_TYPE"
  | "SEARCH_DELETED_EXPENSE_TYPES"
  | "SEARCH_EXPENSE_TYPES"
  //ITEM
  | "GET_ITEMS"
  | "CHANGE_ITEM_QUANTITY"
  | "GET_ITEM"
  | "ADD_ITEM"
  | "GET_ITEM_BY_ID"
  | "UPDATE_ITEM"
  | "DELETE_ITEM_IMAGE"
  | "DELETE_ITEM"
  | "COUNT_ITEM"
  | "SEARCH_ITEMS"
  | "RESTORE_ITEM"
  | "SEARCH_DELETED_ITEMS"
  | "GET_DELETED_ITEMS"
  | "GET_LESS_ITEMS"
  | "SEARCH_LESS_ITEMS"
  //SELL
  | "GET_SELL"
  | "RESTORE_SELL"
  | "ADD_SELL"
  | "UPDATE_SELL"
  | "DELETE_SELL"
  | "ADD_ITEM_TO_SELL"
  | "UPDATE_ITEM_IN_SELL"
  | "DELETE_ITEM_IN_SELL"
  | "GET_SELL_ITEMS"
  | "GET_DELETED_SELL_ITEMS"
  | "INCREASE_ITEM_IN_SELL"
  | "DECREASE_ITEM_IN_SELL"
  | "GET_SELL_PRINT"
  | "GET_SELLS"
  | "GET_DELETED_SELLS"
  | "SEARCH_DELETED_SELLS"
  | "SEARCH_SELLS"
  | "GET_SELF_DELETED_SELL_ITEMS"
  | "SEARCH_SELF_DELETED_SELL_ITEMS"
  | "RESTORE_SELF_DELETED_SELL_ITEM"
  //RESERVATION
  | "GET_PANEL_RESERVATIONS"
  | "GET_RESERVATIONS"
  | "GET_DELETED_RESERVATIONS"
  | "RESTORE_RESERVATION"
  | "COMPLETE_RESERVATION"
  | "SEARCH_DELETED_RESERVATIONS"
  | "ADD_RESERVATION"
  | "UPDATE_RESERVATION"
  | "DELETE_RESERVATION"
  | "SEARCH_RESERVATIONS"
  //PART
  | "GET_PARTS"
  | "ADD_PART"
  | "UPDATE_PART"
  | "DELETE_PART"
  | "GET_ROLE_PARTS"
  //AUTH
  | "GET_AUTH"
  | "CHANGE_PROFILE"
  | "LOGIN"
  //BACKUP
  | "GET_BACKUPS"
  | "GET_TABLE_NAMES"
  | "BACKUP"
  //DASHBOARD
  | "GET_DASHBOARD_DATA"
  //REPORT
  | "GET_SELL_REPORTS"
  | "GET_SELL_REPORTS_INFORMATION"
  | "GET_SELL_REPORTS_SEARCH"
  | "GET_SELL_REPORTS_INFORMATION_SEARCH"
  | "SELL_PRINT_DATA"
  | "GET_ITEM_REPORTS"
  | "GET_ITEM_REPORTS_INFORMATION"
  | "GET_ITEM_REPORTS_SEARCH"
  | "GET_ITEM_REPORTS_INFORMATION_SEARCH"
  | "ITEM_PRINT_DATA"
  | "GET_KOGA_ALL_REPORTS"
  | "GET_KOGA_ALL_REPORTS_INFORMATION"
  | "GET_KOGA_ALL_REPORTS_SEARCH"
  | "GET_KOGA_ALL_REPORTS_INFORMATION_SEARCH"
  | "KOGA_ALL_PRINT_DATA"
  | "GET_KOGA_NULL_REPORTS"
  | "GET_KOGA_NULL_REPORTS_INFORMATION"
  | "GET_KOGA_NULL_REPORTS_SEARCH"
  | "GET_KOGA_NULL_REPORTS_INFORMATION_SEARCH"
  | "KOGA_NULL_PRINT_DATA"
  | "GET_KOGA_LESS_REPORTS"
  | "GET_KOGA_LESS_REPORTS_INFORMATION"
  | "GET_KOGA_LESS_REPORTS_SEARCH"
  | "GET_KOGA_LESS_REPORTS_INFORMATION_SEARCH"
  | "KOGA_LESS_PRINT_DATA"
  | "GET_KOGA_MOVEMENT_REPORTS"
  | "GET_KOGA_MOVEMENT_REPORTS_INFORMATION"
  | "GET_KOGA_MOVEMENT_REPORTS_SEARCH"
  | "GET_KOGA_MOVEMENT_REPORTS_INFORMATION_SEARCH"
  | "KOGA_MOVEMENT_PRINT_DATA"
  | "GET_BILL_PROFIT_REPORTS"
  | "GET_BILL_PROFIT_REPORTS_INFORMATION"
  | "GET_BILL_PROFIT_REPORTS_SEARCH"
  | "GET_BILL_PROFIT_REPORTS_INFORMATION_SEARCH"
  | "BILL_PROFIT_PRINT_DATA"
  | "GET_ITEM_PROFIT_REPORTS"
  | "GET_ITEM_PROFIT_REPORTS_INFORMATION"
  | "GET_ITEM_PROFIT_REPORTS_SEARCH"
  | "GET_ITEM_PROFIT_REPORTS_INFORMATION_SEARCH"
  | "ITEM_PROFIT_PRINT_DATA"
  | "GET_EXPENSE_REPORTS"
  | "GET_EXPENSE_REPORTS_INFORMATION"
  | "GET_EXPENSE_REPORTS_SEARCH"
  | "GET_EXPENSE_REPORTS_INFORMATION_SEARCH"
  | "EXPENSE_PRINT_DATA"
  | "GET_CASE_REPORTS"
  | "GET_CASE_GLOBAL_DATA"
  | "GET_CASE_REPORTS_INFORMATION"
  | "GET_CASE_REPORTS_SEARCH"
  | "GET_CASE_REPORTS_INFORMATION_SEARCH"
  | "CASE_PRINT_DATA"
  | "GET_RESERVATION_REPORTS"
  | "GET_RESERVATION_REPORTS_INFORMATION"
  | "GET_RESERVATION_REPORTS_SEARCH"
  | "GET_RESERVATION_REPORTS_INFORMATION_SEARCH"
  | "RESERVATION_PRINT_DATA"

  //CONFIG
  | "GET_CONFIGS"
  | "UPDATE_CONFIG";

export const URLs: { [key in URLS]: string } = {
  //USER
  GET_USERS: `${API}/user`,
  GET_DELETED_USERS: `${API}/user/deleted`,
  RESTORE_USER: `${API}/user/restore`,
  SEARCH_USERS: `${API}/user/search`,
  SEARCH_DELETED_USERS: `${API}/user/deleted_search`,
  GET_USERS_SELECTION: `${API}/user/select`,

  ADD_USER: `${API}/user`,
  UPDATE_USER: `${API}/user`,
  DELETE_USER: `${API}/user`,
  //CUSTOMER
  GET_CUSTOMERS: `${API}/customer`,
  GET_CUSTOMERS_SELECTION: `${API}/customer/select`,

  ADD_CUSTOMER: `${API}/customer`,
  UPDATE_CUSTOMER: `${API}/customer`,
  DELETE_CUSTOMER: `${API}/customer`,
  GET_DELETED_CUSTOMERS: `${API}/customer/deleted`,
  RESTORE_CUSTOMER: `${API}/customer/restore`,
  SEARCH_DELETED_CUSTOMERS: `${API}/customer/deleted_search`,
  SEARCH_CUSTOMERS: `${API}/customer/search`,
  //EXPENSE
  GET_EXPENSES: `${API}/expense`,
  ADD_EXPENSE: `${API}/expense`,
  UPDATE_EXPENSE: `${API}/expense`,
  DELETE_EXPENSE: `${API}/expense`,
  GET_DELETED_EXPENSES: `${API}/expense/deleted`,
  RESTORE_EXPENSE: `${API}/expense/restore`,
  SEARCH_EXPENSES: `${API}/expense/search`,
  SEARCH_DELETED_EXPENSES: `${API}/expense/deleted_search`,
  //ROLE
  GET_ROLES: `${API}/role`,
  GET_ROLES_SELECTION: `${API}/role/select`,

  ADD_ROLE: `${API}/role`,
  UPDATE_ROLE: `${API}/role`,
  DELETE_ROLE: `${API}/role`,
  GET_DELETED_ROLES: `${API}/role/deleted`,
  RESTORE_ROLE: `${API}/role/restore`,
  SEARCH_DELETED_ROLES: `${API}/role/deleted_search`,
  SEARCH_ROLES: `${API}/role/search`,

  //COLOR
  GET_COLORS: `${API}/color`,
  GET_COLORS_SELECTION: `${API}/color/select`,

  ADD_COLOR: `${API}/color`,
  UPDATE_COLOR: `${API}/color`,
  DELETE_COLOR: `${API}/color`,
  GET_DELETED_COLORS: `${API}/color/deleted`,
  RESTORE_COLOR: `${API}/color/restore`,
  SEARCH_DELETED_COLORS: `${API}/color/deleted_search`,
  SEARCH_COLORS: `${API}/color/search`,

  //CAR_MODEL
  GET_CAR_MODELS: `${API}/car-model`,
  GET_CAR_MODELS_SELECTION: `${API}/car-model/select`,

  ADD_CAR_MODEL: `${API}/car-model`,
  UPDATE_CAR_MODEL: `${API}/car-model`,
  DELETE_CAR_MODEL: `${API}/car-model`,
  GET_DELETED_CAR_MODELS: `${API}/car-model/deleted`,
  RESTORE_CAR_MODEL: `${API}/car-model/restore`,
  SEARCH_DELETED_CAR_MODELS: `${API}/car-model/deleted_search`,
  SEARCH_CAR_MODELS: `${API}/car-model/search`,

  //CAR_TYPE
  GET_CAR_TYPES: `${API}/car-type`,
  GET_CAR_TYPES_SELECTION: `${API}/car-type/select`,

  ADD_CAR_TYPE: `${API}/car-type`,
  UPDATE_CAR_TYPE: `${API}/car-type`,
  DELETE_CAR_TYPE: `${API}/car-type`,
  GET_DELETED_CAR_TYPES: `${API}/car-type/deleted`,
  RESTORE_CAR_TYPE: `${API}/car-type/restore`,
  SEARCH_DELETED_CAR_TYPES: `${API}/car-type/deleted_search`,
  SEARCH_CAR_TYPES: `${API}/car-type/search`,

  //EXPENSE_TYPE
  GET_EXPENSE_TYPES_SELECTION: `${API}/expense-type/select`,
  GET_EXPENSE_TYPES: `${API}/expense-type`,
  ADD_EXPENSE_TYPE: `${API}/expense-type`,
  UPDATE_EXPENSE_TYPE: `${API}/expense-type`,
  DELETE_EXPENSE_TYPE: `${API}/expense-type`,
  GET_DELETED_EXPENSE_TYPES: `${API}/expense-type/deleted`,
  RESTORE_EXPENSE_TYPE: `${API}/expense-type/restore`,
  SEARCH_DELETED_EXPENSE_TYPES: `${API}/expense-type/deleted_search`,
  SEARCH_EXPENSE_TYPES: `${API}/expense-type/search`,

  //ITEM_TYPE
  GET_ITEM_TYPES_SELECTED: `${API}/item-type/select`,
  GET_ITEM_TYPES: `${API}/item-type`,
  ADD_ITEM_TYPE: `${API}/item-type`,
  UPDATE_ITEM_TYPE: `${API}/item-type`,
  DELETE_ITEM_TYPE: `${API}/item-type`,
  GET_DELETED_ITEM_TYPES: `${API}/item-type/deleted`,
  RESTORE_ITEM_TYPE: `${API}/item-type/restore`,
  SEARCH_DELETED_ITEM_TYPES: `${API}/item-type/deleted_search`,
  SEARCH_ITEM_TYPES: `${API}/item-type/search`,
  GET_LESS_ITEMS: `${API}/item/less`,
  SEARCH_LESS_ITEMS: `${API}/item/search_less`,

  //SERVICE
  GET_SERVICES: `${API}/service`,
  GET_SERVICES_SELECTION: `${API}/service/select`,

  ADD_SERVICE: `${API}/service`,
  UPDATE_SERVICE: `${API}/service`,
  DELETE_SERVICE: `${API}/service`,
  GET_DELETED_SERVICES: `${API}/service/deleted`,
  RESTORE_SERVICE: `${API}/service/restore`,
  SEARCH_DELETED_SERVICES: `${API}/service/deleted_search`,
  SEARCH_SERVICES: `${API}/service/search`,

  //ITEM
  GET_ITEM_BY_ID: `${API}/item`,
  UPDATE_ITEM: `${API}/item`,
  DELETE_ITEM_IMAGE: `${API}/item/delete_image`,
  DELETE_ITEM: `${API}/item`,
  RESTORE_ITEM: `${API}/item/restore`,
  CHANGE_ITEM_QUANTITY: `${API}/item/change_quantity`,
  SEARCH_ITEMS: `${API}/item/search`,
  GET_ITEMS: `${API}/item`,
  SEARCH_DELETED_ITEMS: `${API}/item/deleted_search`,
  GET_DELETED_ITEMS: `${API}/item/deleted`,
  GET_ITEM: `${API}/item`,
  COUNT_ITEM: `${API}/item/count`,
  ADD_ITEM: `${API}/item`,

  //SELL
  RESTORE_SELL: `${API}/sell/restore`,
  ADD_SELL: `${API}/sell`,
  UPDATE_SELL: `${API}/sell`,
  DELETE_SELL: `${API}/sell`,
  GET_SELL: `${API}/sell/sell`,
  GET_SELL_ITEMS: `${API}/sell/sell_items`,
  GET_DELETED_SELL_ITEMS: `${API}/sell/deleted_sell_items`,

  ADD_ITEM_TO_SELL: `${API}/sell/add_item_to_sell`,
  UPDATE_ITEM_IN_SELL: `${API}/sell/update_item_in_sell`,
  DELETE_ITEM_IN_SELL: `${API}/sell/delete_item_in_sell`,
  INCREASE_ITEM_IN_SELL: `${API}/sell/increase_item_in_sell`,
  DECREASE_ITEM_IN_SELL: `${API}/sell/decrease_item_in_sell`,
  GET_SELL_PRINT: `${API}/sell/print`,
  GET_SELLS: `${API}/sell`,
  GET_DELETED_SELLS: `${API}/sell/deleted`,
  SEARCH_DELETED_SELLS: `${API}/sell/deleted_search`,
  SEARCH_SELLS: `${API}/sell/search`,

  GET_SELF_DELETED_SELL_ITEMS: `${API}/sell/self_deleted_sell_items`,

  SEARCH_SELF_DELETED_SELL_ITEMS: `${API}/sell/search_deleted_sell_items`,
  RESTORE_SELF_DELETED_SELL_ITEM: `${API}/sell/restore_self_deleted_sell_item`,

  //RESERVATION
  GET_PANEL_RESERVATIONS: `${API}/reservation/panel`,
  GET_RESERVATIONS: `${API}/reservation`,
  GET_DELETED_RESERVATIONS: `${API}/reservation/deleted`,
  RESTORE_RESERVATION: `${API}/reservation/restore`,
  COMPLETE_RESERVATION: `${API}/reservation/complete`,

  SEARCH_DELETED_RESERVATIONS: `${API}/reservation/deleted_search`,
  SEARCH_RESERVATIONS: `${API}/reservation/search`,
  ADD_RESERVATION: `${API}/reservation`,
  UPDATE_RESERVATION: `${API}/reservation`,
  DELETE_RESERVATION: `${API}/reservation`,
  //PART
  GET_PARTS: `${API}/part`,
  ADD_PART: `${API}/part`,
  UPDATE_PART: `${API}/part`,
  DELETE_PART: `${API}/part`,
  GET_ROLE_PARTS: `${API}/role-part/role`,

  //AUTH
  GET_AUTH: `${API}/auth`,
  CHANGE_PROFILE: `${API}/auth/change_profile`,
  LOGIN: `${API}/auth/login`,

  //BACKUPS

  GET_BACKUPS: `${API}/backup/all_table`,
  GET_TABLE_NAMES: `${API}/backup/table_names`,

  BACKUP: `${API}/backup`,

  //DASHBOARD
  GET_DASHBOARD_DATA: `${API}/dashboard`,

  //REPORT

  GET_SELL_REPORTS: `${API}/report/sell`,
  GET_SELL_REPORTS_INFORMATION: `${API}/report/sell/information`,

  GET_SELL_REPORTS_SEARCH: `${API}/report/sell_search`,
  GET_SELL_REPORTS_INFORMATION_SEARCH: `${API}/report/sell_search/information`,
  SELL_PRINT_DATA: `${API}/report/sell/print`,

  GET_ITEM_REPORTS: `${API}/report/item`,
  GET_ITEM_REPORTS_INFORMATION: `${API}/report/item/information`,

  GET_ITEM_REPORTS_SEARCH: `${API}/report/item_search`,
  GET_ITEM_REPORTS_INFORMATION_SEARCH: `${API}/report/item_search/information`,
  ITEM_PRINT_DATA: `${API}/report/item/print`,

  GET_KOGA_ALL_REPORTS: `${API}/report/koga_all`,
  GET_KOGA_ALL_REPORTS_INFORMATION: `${API}/report/koga_all/information`,

  GET_KOGA_ALL_REPORTS_SEARCH: `${API}/report/koga_all_search`,
  GET_KOGA_ALL_REPORTS_INFORMATION_SEARCH: `${API}/report/koga_all_search/information`,
  KOGA_ALL_PRINT_DATA: `${API}/report/koga_all/print`,

  GET_KOGA_NULL_REPORTS: `${API}/report/koga_null`,
  GET_KOGA_NULL_REPORTS_INFORMATION: `${API}/report/koga_null/information`,

  GET_KOGA_NULL_REPORTS_SEARCH: `${API}/report/koga_null_search`,
  GET_KOGA_NULL_REPORTS_INFORMATION_SEARCH: `${API}/report/koga_null_search/information`,
  KOGA_NULL_PRINT_DATA: `${API}/report/koga_null/print`,

  GET_KOGA_LESS_REPORTS: `${API}/report/koga_less`,
  GET_KOGA_LESS_REPORTS_INFORMATION: `${API}/report/koga_less/information`,

  GET_KOGA_LESS_REPORTS_SEARCH: `${API}/report/koga_less_search`,
  GET_KOGA_LESS_REPORTS_INFORMATION_SEARCH: `${API}/report/koga_less_search/information`,
  KOGA_LESS_PRINT_DATA: `${API}/report/koga_less/print`,

  GET_KOGA_MOVEMENT_REPORTS: `${API}/report/koga_movement`,
  GET_KOGA_MOVEMENT_REPORTS_INFORMATION: `${API}/report/koga_movement/information`,

  GET_KOGA_MOVEMENT_REPORTS_SEARCH: `${API}/report/koga_movement_search`,
  GET_KOGA_MOVEMENT_REPORTS_INFORMATION_SEARCH: `${API}/report/koga_movement_search/information`,
  KOGA_MOVEMENT_PRINT_DATA: `${API}/report/koga_movement/print`,

  GET_BILL_PROFIT_REPORTS: `${API}/report/bill_profit`,
  GET_BILL_PROFIT_REPORTS_INFORMATION: `${API}/report/bill_profit/information`,

  GET_BILL_PROFIT_REPORTS_SEARCH: `${API}/report/bill_profit_search`,
  GET_BILL_PROFIT_REPORTS_INFORMATION_SEARCH: `${API}/report/bill_profit_search/information`,
  BILL_PROFIT_PRINT_DATA: `${API}/report/bill_profit/print`,

  GET_ITEM_PROFIT_REPORTS: `${API}/report/item_profit`,
  GET_ITEM_PROFIT_REPORTS_INFORMATION: `${API}/report/item_profit/information`,

  GET_ITEM_PROFIT_REPORTS_SEARCH: `${API}/report/item_profit_search`,
  GET_ITEM_PROFIT_REPORTS_INFORMATION_SEARCH: `${API}/report/item_profit_search/information`,
  ITEM_PROFIT_PRINT_DATA: `${API}/report/item_profit/print`,

  GET_EXPENSE_REPORTS: `${API}/report/expense`,
  GET_EXPENSE_REPORTS_INFORMATION: `${API}/report/expense/information`,

  GET_EXPENSE_REPORTS_SEARCH: `${API}/report/expense_search`,
  GET_EXPENSE_REPORTS_INFORMATION_SEARCH: `${API}/report/expense_search/information`,
  EXPENSE_PRINT_DATA: `${API}/report/expense/print`,

  GET_CASE_REPORTS: `${API}/report/case`,
  GET_CASE_GLOBAL_DATA: `${API}/report/case/global`,

  GET_CASE_REPORTS_INFORMATION: `${API}/report/case/information`,

  GET_CASE_REPORTS_SEARCH: `${API}/report/case_search`,
  GET_CASE_REPORTS_INFORMATION_SEARCH: `${API}/report/case_search/information`,
  CASE_PRINT_DATA: `${API}/report/case/print`,

  GET_RESERVATION_REPORTS: `${API}/report/reservation`,
  GET_RESERVATION_REPORTS_INFORMATION: `${API}/report/reservation/information`,

  GET_RESERVATION_REPORTS_SEARCH: `${API}/report/reservation_search`,
  GET_RESERVATION_REPORTS_INFORMATION_SEARCH: `${API}/report/reservation_search/information`,
  RESERVATION_PRINT_DATA: `${API}/report/reservation/print`,

  //CONFIG

  GET_CONFIGS: `${API}/config`,
  UPDATE_CONFIG: `${API}/config`,
};
