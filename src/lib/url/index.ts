import { ENUMs } from "../enum";
const API = ENUMs.API;
export type URLS =
  | "GET_CASE_MONEY"
  | "GET_CASE_HISTORY"
  | "GET_CASE_CHART"
  | "GET_REPORT_MONEY_DATA"
  | "GET_REPORT_MOST_ITEM"
  | "GET_REPORT_MOST_ORDER"
  | "GET_SPENDS"
  | "GET_SETTINGS"
  | "UPDATE_SETTING"
  | "ADD_SPEND"
  | "GET_USERS"
  | "ADD_USER"
  | "UPDATE_USER"
  | "DELETE_USER"
  | "GET_CLIENTS"
  | "ADD_CLIENT"
  | "UPDATE_CLIENT"
  | "DELETE_CLIENT"
  | "GET_ROLES"
  | "ADD_ROLE"
  | "UPDATE_ROLE"
  | "DELETE_ROLE"
  | "GET_CAR_MODELS"
  | "ADD_CAR_MODEL"
  | "UPDATE_CAR_MODEL"
  | "DELETE_CAR_MODEL"
  | "GET_CAR_TYPES"
  | "ADD_CAR_TYPE"
  | "UPDATE_CAR_TYPE"
  | "DELETE_CAR_TYPE"
  | "GET_COLORS"
  | "ADD_COLOR"
  | "UPDATE_COLOR"
  | "DELETE_COLOR"
  | "GET_SERVICES"
  | "ADD_SERVICE"
  | "UPDATE_SERVICE"
  | "DELETE_SERVICE"
  | "GET_EXPENSE_TYPES"
  | "ADD_EXPENSE_TYPE"
  | "UPDATE_EXPENSE_TYPE"
  | "DELETE_EXPENSE_TYPE"
  | "GET_CITIES"
  | "ADD_CITY"
  | "UPDATE_CITY"
  | "DELETE_CITY"
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
  | "GET_EMPLOYEES_COMBOBOX"
  | "GET_ROLE_PARTS"
  | "GET_LESS_ITEMS"
  | "COUNT_ITEM"
  | "UPDATE_SPEND"
  | "SEARCH_USERS"
  | "SEARCH_ITEMS";

export const URLs: { [key in URLS]: string } = {
  //case routes
  GET_CASE_MONEY: `${API}/case`,
  GET_CASE_HISTORY: `${API}/case/history`,
  GET_CASE_CHART: `${API}/case/chart`,
  GET_REPORT_MONEY_DATA: `${API}/case/money`,
  GET_REPORT_MOST_ITEM: `${API}/case/most`,
  GET_REPORT_MOST_ORDER: `${API}/case/most`,
  GET_SPENDS: `${API}/expense`,
  GET_SETTINGS: `${API}/setting`,
  UPDATE_SETTING: `${API}/setting`,
  ADD_SPEND: `${API}/expense`,
  UPDATE_SPEND: `${API}/expense`,

  GET_USERS: `${API}/user`,
  SEARCH_USERS: `${API}/user/search`,

  ADD_USER: `${API}/user`,
  UPDATE_USER: `${API}/user`,
  DELETE_USER: `${API}/user`,

  GET_CLIENTS: `${API}/customer`,
  ADD_CLIENT: `${API}/customer`,
  UPDATE_CLIENT: `${API}/customer`,
  DELETE_CLIENT: `${API}/customer`,

  GET_ROLES: `${API}/role`,
  ADD_ROLE: `${API}/role`,
  UPDATE_ROLE: `${API}/role`,
  DELETE_ROLE: `${API}/role`,

  GET_CAR_MODELS: `${API}/car-model`,
  ADD_CAR_MODEL: `${API}/car-model`,
  UPDATE_CAR_MODEL: `${API}/car-model`,
  DELETE_CAR_MODEL: `${API}/car-model`,

  GET_CAR_TYPES: `${API}/car-type`,
  ADD_CAR_TYPE: `${API}/car-type`,
  UPDATE_CAR_TYPE: `${API}/car-type`,
  DELETE_CAR_TYPE: `${API}/car-type`,

  GET_SERVICES: `${API}/service`,
  ADD_SERVICE: `${API}/service`,
  UPDATE_SERVICE: `${API}/service`,
  DELETE_SERVICE: `${API}/service`,

  GET_COLORS: `${API}/color`,
  ADD_COLOR: `${API}/color`,
  UPDATE_COLOR: `${API}/color`,
  DELETE_COLOR: `${API}/color`,

  GET_EXPENSE_TYPES: `${API}/expense-type`,
  ADD_EXPENSE_TYPE: `${API}/expense-type`,
  UPDATE_EXPENSE_TYPE: `${API}/expense-type`,
  DELETE_EXPENSE_TYPE: `${API}/expense-type`,

  GET_CITIES: `${API}/city`,
  ADD_CITY: `${API}/city`,
  UPDATE_CITY: `${API}/city`,
  DELETE_CITY: `${API}/city`,

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

  GET_EMPLOYEES_COMBOBOX: `${API}/employee/combobox`,
  GET_ROLE_PARTS: `${API}/role-part/role`,
};
