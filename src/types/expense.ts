import { Id } from "./global";

export type AddExpenseInputs = {
  type_id: Id;
  price: number;
  date: Date | string;
  note: string;
};
export type Expense = {
  id: Id;
  type_name: string;
  type_id: number;
  price: number;
  date: Date | string;
  note: string;
  created_at: Date | null;
  updated_at: Date | null;
  created_by: string;
  updated_by: string;
  deleted: boolean;
};
export type ExpenseCardProps = Expense & {
  index?: number;
};

export type AddExpenseF = AddExpenseInputs & {
  date: Date | string | null;
};
export type UpdateExpenseF = AddExpenseInputs & {
  date: Date | string | null;
};

export type DeleteExpenseQ = Id[];

export type GetExpensesQ = Expense[];
export type AddExpenseQ = Expense;
export type UpdateExpenseQ = Expense;
