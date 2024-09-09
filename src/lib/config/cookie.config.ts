import { Cookie } from "@/types";
import Cookies from "cookies-ts";

const cookies = new Cookies();

export const setCookie = ({ name, token }: Cookie): Cookies => {
  return cookies.set(name, token, {
    expires: 864000,
    secure: true,
    path: "/",
  });
};

export const removeCookie = ({ name }: Cookie): boolean | Cookies => {
  return cookies.remove(name);
};

export const getCookie = ({ name }: Cookie): string | null => {
  return cookies.get(name);
};
