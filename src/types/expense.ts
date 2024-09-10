import { Id } from "./global";

export type AddExpenseInputs = {
  expense_type_id: Id;
  price: number;
  date: Date | string;
  note: string;
};
export type Expense = {
  id: Id;
  type: string;
  price: number;
  date: Date | string;
  note: string;
  created_at: Date | null;
  updated_at: Date | null;
  deleted: boolean;
};
export type ExpenseCardProps = Expense & {
  onClick: (id: Id) => void;
};

export type AddExpenseF = AddExpenseInputs & {
  date: Date | string | null;
};
export type UpdateExpenseF = AddExpenseInputs & {
  date: Date | string | null;
};

export type GetExpensesQ = Expense[];
export type AddExpenseQ = Expense;
export type UpdateExpenseQ = Expense;
