import { Id } from "./global";
import { Product } from "./products";

export type CaseHistory = {
  situation: string;
  date: Date | Id;
  money: string;
  id: Id;
  type: "revenue" | "spend";
  case_id: Id;
};

export type CaseChart = {
  type: "revenue" | "spend";
  value: number;
  label: "خەرجی" | "داهات";
};

export type Money = string | number;

export type CaseMoney<T> = {
  id: Id;
  type: T;
  amount: Money;
};

export type CaseRevenue = CaseMoney<"revenue">;
export type CaseSpend = CaseMoney<"spend">;
export type CaseDept = CaseMoney<"dept">;

export type ReportMoney = {
  id: Id;
  money: Money;
  spend: Money;
  dept: Money;
  dept_psula: ReportData;
  naqd_psula: ReportData;
  wasl_psula: ReportData;
  new_customers: ReportData;
  dept_amount: ReportData;
  date: Date | number;
};

export type ReportData = Id;
export type ReportChart = {
  id: Id;
  value: number;
  label: string;
};

export type Case = {
  id: Id;
  money: number;
};

export type GetCaseMoneyQ = Case;

export type GetCaseHistoryQ = CaseHistory[];

export type GetCaseChartQ = CaseChart[];

export type GetReportMoneyDataQ = ReportMoney;

export type GetReportMostProductQ = Product[];

export type GetReportMostOrderQ = ReportChart[];
