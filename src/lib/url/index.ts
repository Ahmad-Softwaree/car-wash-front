import { ENUMs } from "../enum";
const API = ENUMs.API;
export type URLS =
  //USER
  | "GET_USERS"
  | "GET_DELETED_USERS"
  | "RESTORE_USER"
  | "SEARCH_DELETED_USERS"
  | "ADD_USER"
  | "UPDATE_USER"
  | "DELETE_USER"
  | "SEARCH_USERS"

  //CUSTOMER
  | "GET_CUSTOMERS"
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
  | "GET_COLORS"
  | "ADD_COLOR"
  | "UPDATE_COLOR"
  | "DELETE_COLOR"
  | "GET_DELETED_COLORS"
  | "RESTORE_COLOR"
  | "SEARCH_DELETED_COLORS"
  | "SEARCH_COLORS"
  //CAR_MODEL
  | "GET_CAR_MODELS"
  | "ADD_CAR_MODEL"
  | "UPDATE_CAR_MODEL"
  | "DELETE_CAR_MODEL"
  | "GET_DELETED_CAR_MODELS"
  | "RESTORE_CAR_MODEL"
  | "SEARCH_DELETED_CAR_MODELS"
  | "SEARCH_CAR_MODELS"
  //CAR_TYPE
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
  //
  | "GET_CASE_MONEY"
  | "GET_CASE_HISTORY"
  | "GET_CASE_CHART"
  | "GET_REPORT_MONEY_DATA"
  | "GET_REPORT_MOST_ITEM"
  | "GET_REPORT_MOST_ORDER"
  | "GET_SETTINGS"
  | "UPDATE_SETTING"
  | "GET_PARTS"
  | "ADD_PART"
  | "UPDATE_PART"
  | "DELETE_PART"
  | "GET_ITEMS"
  | "GET_ITEM"
  | "ADD_ITEM"
  | "GET_AUTH"
  | "CHANGE_PROFILE"
  | "LOGIN"
  | "GET_ITEM_IN_ADD"
  | "GET_ITEM_BY_ID"
  | "UPDATE_ITEM"
  | "DELETE_ITEM"
  | "GET_ROLE_PARTS"
  | "GET_LESS_ITEMS"
  | "COUNT_ITEM"
  | "SEARCH_ITEMS";

export const URLs: { [key in URLS]: string } = {
  //USER
  GET_USERS: `${API}/user`,
  GET_DELETED_USERS: `${API}/user/deleted`,
  RESTORE_USER: `${API}/user/restore`,
  SEARCH_DELETED_USERS: `${API}/user/deleted_search`,
  SEARCH_USERS: `${API}/user/search`,
  ADD_USER: `${API}/user`,
  UPDATE_USER: `${API}/user`,
  DELETE_USER: `${API}/user`,
  //CUSTOMER
  GET_CUSTOMERS: `${API}/customer`,
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
  ADD_COLOR: `${API}/color`,
  UPDATE_COLOR: `${API}/color`,
  DELETE_COLOR: `${API}/color`,
  GET_DELETED_COLORS: `${API}/color/deleted`,
  RESTORE_COLOR: `${API}/color/restore`,
  SEARCH_DELETED_COLORS: `${API}/color/deleted_search`,
  SEARCH_COLORS: `${API}/color/search`,

  //CAR_MODEL
  GET_CAR_MODELS: `${API}/car-model`,
  ADD_CAR_MODEL: `${API}/car-model`,
  UPDATE_CAR_MODEL: `${API}/car-model`,
  DELETE_CAR_MODEL: `${API}/car-model`,
  GET_DELETED_CAR_MODELS: `${API}/car-model/deleted`,
  RESTORE_CAR_MODEL: `${API}/car-model/restore`,
  SEARCH_DELETED_CAR_MODELS: `${API}/car-model/deleted_search`,
  SEARCH_CAR_MODELS: `${API}/car-model/search`,

  //CAR_TYPE
  GET_CAR_TYPES: `${API}/car-type`,
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

  //SERVICE
  GET_SERVICES: `${API}/service`,
  ADD_SERVICE: `${API}/service`,
  UPDATE_SERVICE: `${API}/service`,
  DELETE_SERVICE: `${API}/service`,
  GET_DELETED_SERVICES: `${API}/service/deleted`,
  RESTORE_SERVICE: `${API}/service/restore`,
  SEARCH_DELETED_SERVICES: `${API}/service/deleted_search`,
  SEARCH_SERVICES: `${API}/service/search`,

  //
  GET_CASE_MONEY: `${API}/case`,
  GET_CASE_HISTORY: `${API}/case/history`,
  GET_CASE_CHART: `${API}/case/chart`,
  GET_REPORT_MONEY_DATA: `${API}/case/money`,
  GET_REPORT_MOST_ITEM: `${API}/case/most`,
  GET_REPORT_MOST_ORDER: `${API}/case/most`,
  GET_SETTINGS: `${API}/setting`,
  UPDATE_SETTING: `${API}/setting`,

  GET_PARTS: `${API}/part`,
  ADD_PART: `${API}/part`,
  UPDATE_PART: `${API}/part`,
  DELETE_PART: `${API}/part`,

  GET_ITEMS: `${API}/item`,
  GET_ITEM: `${API}/item`,
  GET_LESS_ITEMS: `${API}/item/less`,
  COUNT_ITEM: `${API}/item/count`,
  ADD_ITEM: `${API}/item`,
  GET_AUTH: `${API}/auth`,
  CHANGE_PROFILE: `${API}/auth/change_profile`,
  LOGIN: `${API}/auth/login`,
  GET_ITEM_IN_ADD: `${API}/item/in_add`,
  GET_ITEM_BY_ID: `${API}/item`,
  UPDATE_ITEM: `${API}/item`,
  DELETE_ITEM: `${API}/item`,
  SEARCH_ITEMS: `${API}/item/search`,

  GET_ROLE_PARTS: `${API}/role-part/role`,
};
