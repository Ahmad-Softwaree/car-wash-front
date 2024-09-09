import { Id } from "./global";

export type GetExpenseTypesQ = ExpenseType[];

export type ExpenseType = {
  name: string;
  id: Id;
};

export type ExpenseTypeCardProps = ExpenseType;

export type AddExpenseTypeInputs = {
  name: string;
};

export type AddExpenseTypeF = AddExpenseTypeInputs;

export type UpdateExpenseTypeF = AddExpenseTypeInputs;
export type AddExpenseTypeQ = ExpenseType;

export type UpdateExpenseTypeQ = ExpenseType;

export type DeleteExpenseTypeQ = Id;
