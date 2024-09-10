import { ENUMs } from "../enum";
const API = ENUMs.API;
export type URLS =
  | "GET_CASE_MONEY"
  | "GET_CASE_HISTORY"
  | "GET_CASE_CHART"
  | "GET_REPORT_MONEY_DATA"
  | "GET_REPORT_MOST_PRODUCT"
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
  | "GET_PRODUCTS"
  | "GET_PRODUCT"
  | "ADD_PRODUCT"
  | "GET_AUTH"
  | "CHANGE_NAME"
  | "CHANGE_PASSWORD"
  | "LOGIN"
  | "GET_PRODUCT_IN_ADD"
  | "GET_PRODUCT_BY_ID"
  | "UPDATE_PRODUCT"
  | "DELETE_PRODUCT"
  | "GET_EMPLOYEES_COMBOBOX"
  | "GET_ROLE_PARTS"
  | "CHECK_SETTING"
  | "GET_CONFIGS"
  | "UPDATE_CONFIG"
  | "GET_LESS_PRODUCTS"
  | "COUNT_PRODUCT"
  | "UPDATE_SPEND";

export const URLs: { [key in URLS]: string } = {
  //case routes
  GET_CASE_MONEY: `${API}/case`,
  GET_CASE_HISTORY: `${API}/case/history`,
  GET_CASE_CHART: `${API}/case/chart`,
  GET_REPORT_MONEY_DATA: `${API}/case/money`,
  GET_REPORT_MOST_PRODUCT: `${API}/case/most`,
  GET_REPORT_MOST_ORDER: `${API}/case/most`,
  GET_SPENDS: `${API}/expense`,
  GET_SETTINGS: `${API}/setting`,
  UPDATE_SETTING: `${API}/setting`,
  ADD_SPEND: `${API}/expense`,
  UPDATE_SPEND: `${API}/expense`,

  GET_USERS: `${API}/user`,
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

  GET_PRODUCTS: `${API}/product`,
  GET_PRODUCT: `${API}/product`,
  GET_LESS_PRODUCTS: `${API}/product/less`,
  COUNT_PRODUCT: `${API}/product/count`,
  ADD_PRODUCT: `${API}/product`,
  GET_AUTH: `${API}/auth`,
  CHANGE_NAME: `${API}/auth/change_name`,
  CHANGE_PASSWORD: `${API}/auth/change_password`,
  LOGIN: `${API}/auth/login`,
  GET_PRODUCT_IN_ADD: `${API}/product/in_add`,
  GET_PRODUCT_BY_ID: `${API}/product`,
  UPDATE_PRODUCT: `${API}/product`,
  DELETE_PRODUCT: `${API}/product`,
  GET_EMPLOYEES_COMBOBOX: `${API}/employee/combobox`,
  GET_ROLE_PARTS: `${API}/role-part/role`,
  CHECK_SETTING: `${API}/setting/check`,
  GET_CONFIGS: `${API}/config`,
  UPDATE_CONFIG: `${API}/config`,
};
