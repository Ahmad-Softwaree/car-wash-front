import { Expense } from "./expense";
import { Item, ItemQuantityHistory } from "./items";
import { Reservation } from "./reservation";
import { Sell, SellItem } from "./sell";

export type CaseReport = {
  id: number;
  created_by: string;
  user_id: number;
  sold: number | string;
  sold_price: number | string;
};

export type CaseReportInfo = {
  total_quantity: number;
  total_sell_price: number;
};
export type GlobalCaseInfo = {
  total_money: number;
  total_sell: number;
  total_expense: number;
  remain_money: number;
};
export type CaseReportData = CaseReport & {
  total_quantity: number;
  total_sell_price: number;
};

export type CaseReportCardProps = CaseReport & { index?: number };

export type GetCasesQ = CaseReport[];

export type SellReportInfo = {
  sell_count: number;
  total_sell_price: number;
  total_sell_discount: number;
};

export type SellReportData = Sell & { total_sell_price: number };

export type ItemReportInfo = {
  total_count: number;
  total_sell: number;
  total_sell_price: number;
  total_price: number;
};
export type ItemReportData = SellItem & {
  total_sell: number;
  item_barcode: string;
  type_name: string;
};

export type KogaAllReportInfo = {
  total_count: number;
  total_item_quantity: number;
  total_sell_quantity: number;
  total_purchase_price: number;
  total_sell_price: number;
  total_cost: number;
};
export type KogaAllReportData = Item & {
  total_quantity: number;
  sell_quantity: number;
};

export type KogaNullReportInfo = {
  total_count: number;
  total_item_quantity: number;
  total_sell_quantity: number;
  total_purchase_price: number;
  total_sell_price: number;
  total_cost: number;
};
export type KogaNullReportData = Item & {
  total_quantity: number;
  sell_quantity: number;
};

export type KogaLessReportInfo = {
  total_count: number;
};
export type KogaLessReportData = Item & {
  total_quantity: number;
  sell_quantity: number;
};

export type KogaMovementReportInfo = {
  total_count: number;
  total_item_quantity: number;
  total_purchase_price: number;
  total_cost: number;
};
export type KogaMovementReportData = ItemQuantityHistory & {
  total_quantity: number;
  actual_quantity: number;
  type_name: string;
};

export type BillProfitReportInfo = {
  sell_count: number;
  total_sell_price: number;
  total_sell_discount: number;
  total_purchase_price: number;
  total_profit: number;
};

export type BillProfitReportData = Sell & {
  total_sell_price: number;
  total_purchase_price: number;
};

export type ItemProfitReportInfo = {
  total_single_profit: number;
  total_count: number;
  total_quantity: number;
  total_sell_price: number;
  total_purchase_price: number;
  total_profit: number;
  total_cost: number;
};
export type ItemProfitReportData = SellItem & {
  total_quantity: number;
  item_barcode: string;
  type_id: number;
  type_name: string;
};

export type ExpenseReportInfo = {
  total_price: number;
};
export type ExpenseReportData = Expense & {
  type_name: string;
};

export type ReservationReportInfo = {
  reservation_count: number;
  total_price: number;
};

export type ReservationReportData = Reservation & { total_sell_price: number };
