import { NestError, Token, ToastType } from "@/types/global";
import { setAxiosConfig } from "../config/axios.config";
import { removeCookie, setCookie } from "../config/cookie.config";
import { User } from "@/types/auth";
import { Part } from "@/types/part";

const { VITE_JWT_SECRET, VITE_COOKIE_NAME } = import.meta.env;

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

export const roleName = (role: string): string => {
  if (role == "ئەدمین") return "ئەدمین";

  if (role == "accountant") return "محاسب";
  if (role == "cashier") return "کاشێر";
  return "کارمەند";
};

export const cityName = (city: string): string => {
  if (city == "Sulaymaniah") return "سلێمانی";
  if (city == "سلێمانی") return "سلێمانی";
  if (city == "Duhok") return "دهۆک";
  if (city == "Karkuk") return "کەرکوک";

  return "سلێمانی";
};
export const partName = (part: Part): string => {
  if (part.name == "selling") return "فرۆشتن";
  if (part.name == "koga") return "کۆگا";
  if (part.name == "add") return "زیادکردن";
  if (part.name == "psula") return "پسوڵەکان";
  if (part.name == "create_psula") return "دروستکردنی پسولە";
  if (part.name == "dept") return "قەرز";
  if (part.name == "less") return "مەوادی کەمبوو";
  if (part.name == "mandub") return "مەندووبەکان";
  if (part.name == "employee") return "کارمەندەکان";
  if (part.name == "users") return "بەکارهێنەران";
  if (part.name == "customers") return "کڕیارەکان";
  if (part.name == "expense") return "خەرجی";
  if (part.name == "report") return "ڕاپۆرت";
  if (part.name == "case") return "قاسە";
  if (part.name == "setting") return "ڕێخکستن";

  return "";
};

export const generateToken = async (user: User) => {
  if (!user) throw Error("There is no user");
  let token = JSON.stringify({ id: user.id, name: user.name });
  return token;
};

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
  console.log(error);

  const errorData = error.response?.data as ErrorResponse;
  if (typeof error.message == "string" && !error.response?.data) {
    return toast({
      title: "Error",
      description: error.message,
    });
  }
  if (errorData && "message" in errorData && Array.isArray(errorData.message)) {
    return errorData.message.forEach((val: string, _index: number) => {
      return toast({
        title: error.message,
        description: val,
      });
    });
  } else if ("error" in errorData) {
    return toast({
      title: error.message,
      description: errorData.error,
    });
  } else {
    return toast({
      title: "Unexpected Error",
      description: "An unexpected error occurred.",
    });
  }
};
