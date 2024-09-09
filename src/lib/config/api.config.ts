import axios, { AxiosInstance } from "axios";
import { getCookie } from "./cookie.config";
import { ENUMs } from "../enum";

export const api: AxiosInstance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const authApi: AxiosInstance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getCookie({ name: ENUMs.COOKIE_NAME })}`,
    common: {
      Authorization: `Bearer ${getCookie({ name: ENUMs.COOKIE_NAME })}`,
    },
  },

  withCredentials: true,
});
