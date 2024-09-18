import { Id } from "./global";

export type Customer = {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  created_at: Date | null;
  updated_at: Date | null;
  deleted: boolean;
};

export type CustomerCardProps = Customer & { index?: number };
export type AddCustomerInputs = {
  first_name: string;
  last_name: string;
  phone: string;
};

export type AddCustomerF = AddCustomerInputs;
export type AddCustomerWithFirebaseImage = AddCustomerInputs;
export type UpdateCustomerF = AddCustomerInputs;
export type UpdateCustomerWithFirebaseImage = AddCustomerInputs;
export type GetCustomersQ = Customer[];
export type AddCustomerQ = Customer;
export type DeleteCustomerQ = Id[];

export type UpdateCustomerQ = Customer;
