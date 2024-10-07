import { Item } from "./items";
import { Sell, SellItem } from "./sell";

export type CaseReport = {
  id: number;
  created_by: string;
  user_id: number;
  sold: number | string;
  sold_price: number | string;
};

export type CaseReportCardProps = CaseReport & { index?: number };

export type GetCasesQ = CaseReport[];
export type SellReportInfo = {
  sellData: { sell_count: number; total_item_sell_price: number };
  discountData: number;
};

export type SellReportData = Sell & { total_item_sell_price: number };

export type ItemReportInfo = {
  total_count: number;
  total_quantity: number;
  total_sell_price: number;
  total_price: number;
};
export type ItemReportData = SellItem & Item & { total_quantity: number };

export type KogaAllReportInfo = {
  total_count: number;
  total_item_quantity: number;
  total_actual_quantity: number;
  total_item_purchase_price: number;
  total_actual_quantity_price: number;
  total_cost: number;
};
export type KogaAllReportData = SellItem &
  Item & { total_quantity: number; actual_quantity: number };

export type KogaNullReportInfo = {
  total_count: number;
  total_item_quantity: number;
  total_actual_quantity: number;
  total_item_purchase_price: number;
  total_actual_quantity_price: number;
  total_cost: number;
};
export type KogaNullReportData = SellItem &
  Item & { total_quantity: number; actual_quantity: number };

export type KogaMovementReportInfo = {
  total_count: number;
  total_item_quantity: number;
  total_item_purchase_price: number;
  total_cost: number;
};
export type KogaMovementReportData = SellItem &
  Item & { total_quantity: number; actual_quantity: number };
