import { NestError, Token, ToastType } from "@/types/global";
import { setAxiosConfig } from "../config/axios.config";
import { removeCookie, setCookie } from "../config/cookie.config";
import { User } from "@/types/auth";

const { VITE_COOKIE_NAME } = import.meta.env;

export const downloadFile = (data: Blob, fileName: string) => {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement("a");
  link.href = url;

  link.setAttribute("download", fileName); // file name
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export function timestampToDateString(timestamp: number): string {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
export function formateDateToYMDHM(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }

  const year = date.getFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  // Format the date string
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export function formatDateToDDMMYY(dateString: string): string {
  const date = new Date(dateString);

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = String(date.getUTCFullYear());
  return `${day}/${month}/${year}`;
}

export const generateToken = async (user: User) => {
  if (!user) throw Error("There is no user");
  let token = JSON.stringify({ id: user.id, name: user.name });
  return token;
};
export function parseDateToTimestamp(dateString: string): string {
  const decodedDate = decodeURIComponent(dateString);
  const date = new Date(decodedDate);
  console.log(date);
  return date.getTime().toString();
}

export const toggleAuth = (type: "add" | "remove", token?: Token) => {
  if (type == "add" && token) {
    setAxiosConfig(token);
    setCookie({ name: VITE_COOKIE_NAME, token });
  } else {
    setAxiosConfig(null);
    removeCookie({ name: VITE_COOKIE_NAME });
  }
};
type ErrorResponse = { message: string[] } | { error: string };
export const generateNestErrors = (error: NestError, toast: ToastType) => {
  const errorData = error.response?.data as ErrorResponse;
  if (typeof error.message == "string" && !error.response?.data) {
    return toast({
      title: "کێشە",
      description: error.message,
      alertType: "error",
    });
  }
  if (errorData && "message" in errorData && Array.isArray(errorData.message)) {
    return errorData.message.forEach((val: string, _index: number) => {
      return toast({
        title: error.message,
        description: val,
        alertType: "error",
      });
    });
  } else if ("error" in errorData) {
    return toast({
      title: error.message,
      description: errorData.error,
      alertType: "error",
    });
  } else {
    return toast({
      title: "کێشە",
      description: "کێشەیەکی چاوەڕواننەکراوە ڕوودیدا",
      alertType: "error",
    });
  }
};
