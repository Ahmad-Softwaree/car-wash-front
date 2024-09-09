import { Id } from "./global";

export type AddSpendInputs = {
  title: string;
  amount: Id;
  fromCase: boolean;
  spend_by: string;
  employee: Id;
  note: string;
};
export type Spend = {
  id: Id;
  title: string;
  amount: Id;
  date: Date | Id;
  spend_by: string;
  employee: string;
  note: string;
  fromCase: boolean;
};
export type SpendCardProps = Spend & {
  onClick: (id: Id) => void;
};

export type AddSpendF = AddSpendInputs & {
  date: Date | string | null;
  spend_by: string;
};
export type UpdateSpendF = AddSpendInputs & {
  date: Date | string | null;
  spend_by: string;
};

export type GetSpendsQ = Spend[];
export type AddSpendQ = Spend;
export type UpdateSpendQ = Spend;
