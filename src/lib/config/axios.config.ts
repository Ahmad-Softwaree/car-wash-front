import { authApi } from "./api.config";
import { Token } from "@/types";

export const setAxiosConfig = (token: Token | null): void => {
  if (token) {
    authApi.defaults.headers.Authorization = `Bearer ${token}`;
    authApi.defaults.withCredentials = true;
    authApi.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete authApi.defaults.headers.Authorization;
    delete authApi.defaults.headers.common.Authorization;
  }
};
