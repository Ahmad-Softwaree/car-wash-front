import { CONTEXT_TYPEs } from "@/context/types";
import { api, authApi } from "@/lib/config/api.config";
import { getCookie } from "@/lib/config/cookie.config";
import { toggleAuth } from "@/lib/functions";
import { URLs } from "@/lib/url";
import {
  ChangeProfileF,
  ChangeProfileQ,
  GetAuthQ,
  LoginF,
  LoginQ,
} from "@/types/auth";
import { ToastType } from "@/types/global";
import { Dispatch } from "react";
import { NavigateFunction } from "react-router-dom";
const { VITE_COOKIE_NAME } = import.meta.env;

export const getAuth = async (
  toast: ToastType,
  dispatch: Dispatch<any>,
  navigate: NavigateFunction
): Promise<GetAuthQ> => {
  try {
    const { data, status } = await authApi.get<GetAuthQ>(URLs.GET_AUTH);
    let token = getCookie({ name: VITE_COOKIE_NAME });
    if (token) toggleAuth("add", token);

    dispatch({
      type: CONTEXT_TYPEs.SET_USER,
      payload: {
        user: data,
        token,
      },
    });

    return data;
  } catch (error: any) {
    toggleAuth("remove");
    // generateNestErrors(error.response.data, toast);
    throw navigate("/login");
  }
};

export const login = async (form: LoginF): Promise<LoginQ> => {
  try {
    const { data, status } = await api.post<LoginQ>(URLs.LOGIN, form);

    toggleAuth("add", data.token);

    return data;
  } catch (error: any) {
    toggleAuth("remove");
    throw error;
  }
};
export const logout = async (): Promise<string> => {
  try {
    toggleAuth("remove");
    return "Success";
  } catch (error: any) {
    toggleAuth("remove");
    throw error;
  }
};
export const changeProfile = async (
  form: ChangeProfileF
): Promise<ChangeProfileQ> => {
  try {
    const { data, status } = await authApi.post<ChangeProfileQ>(
      URLs.CHANGE_PROFILE,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
