import { Id } from "./global";

export type Employee = {
  id: Id;
  first_name: string;
  last_name: string;
  phone: string;
  phone1?: string;
  city: string;
  street?: string;
};

export type GetEmployeesComboboxQ = Employee[];
