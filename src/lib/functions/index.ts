import { NestError, Token, ToastType } from "@/types/global";
import { setAxiosConfig } from "../config/axios.config";
import { removeCookie, setCookie } from "../config/cookie.config";
import { User } from "@/types/auth";
import { Part } from "@/types/part";

const { VITE_JWT_SECRET, VITE_COOKIE_NAME } = import.meta.env;
export function timestampToDateString(timestamp: number): string {
  // Create a Date object from the timestamp
  const date = new Date(timestamp);

  // Extract year, month, and day from the Date object
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");

  // Format the date string as YYYY-MM-DD
  return `${year}-${month}-${day}`;
}

export function formatDateToDDMMYY(dateString: string): string {
  const date = new Date(dateString);

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = String(date.getUTCFullYear()).slice(-2); // Get last two digits of the year

  return `${day}/${month}/${year}`;
}

export function getCurrentTime(): string {
  // Create a new Date object
  const now: Date = new Date();

  // Extract hours, minutes, and seconds
  let hours: number = now.getHours();
  const minutes: number = now.getMinutes();

  // Determine AM or PM
  const amPm: string = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Add leading zero to minutes and seconds if needed
  const formattedMinutes: string =
    minutes < 10 ? "0" + minutes : minutes.toString();

  // Combine the time parts into a string
  const currentTime: string = `${hours}:${formattedMinutes} ${amPm}`;
  return currentTime;
}

export function getCurrentDate(): string {
  const now: Date = new Date();

  const day: number = now.getDate();
  const month: number = now.getMonth() + 1; // Months are zero-based
  const year: number = now.getFullYear();

  // Add leading zero to day and month if needed
  const formattedDay: string = day < 10 ? "0" + day : day.toString();
  const formattedMonth: string = month < 10 ? "0" + month : month.toString();

  return `${formattedDay}/${formattedMonth}/${year}`;
}

export function parseDate(dateString: string): Date {
  const [day, month, year] = dateString.split("/").map(Number);

  // Create a Date object from the given dateString with default time as midnight
  const date = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));

  return date;
}

export const generateToken = async (user: User) => {
  if (!user) throw Error("There is no user");
  let token = JSON.stringify({ id: user.id, name: user.name });
  return token;
};
export function parseDateToTimestamp(dateString: string): string {
  const decodedDate = decodeURIComponent(dateString);
  const date = new Date(decodedDate);
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
