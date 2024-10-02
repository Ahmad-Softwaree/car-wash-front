import { Id } from "./global";

export type Sell = {
  id: number;
  discount: number;
  date: Date | string;
  created_at?: Date | null;
  updated_at?: Date | null;
  created_by: string;
  updated_by: string;
  deleted?: boolean;
  total_item_sell_price?: number;
  total_item_purchase_price?: number;
};

export type SellItem = {
  id: number;
  sell_id: number;
  item_id: number;
  item_name: string;
  created_by: string;
  updated_by: string;
  quantity: number;
  item_purchase_price: number;
  item_sell_price: number;
  created_at?: Date | null;
  updated_at?: Date | null;
  deleted?: boolean;
};

export type UpdateSellItemInputs = {
  quantity: number;
};

export type SellCardProps = Sell & { index?: number };
export type SellItemCardProps = SellItem & {
  index?: number;
  state?: "insert" | "read";
  confirm?: boolean;
  self_delete?: boolean;
};
export type GetSellQ = Sell;
export type GetSellsQ = Sell[];

export type GetSellItemsQ = SellItem[];

export type AddSellQ = Sell;

export type UpdateSellQ = Sell;

export type AddSellItemQ = SellItem;

export type UpdateSellItemQ = SellItem;

export type DeleteSellItemQ = Id[];

export type DeleteSellQ = Id[];
export type RestoreSelfDeletedSellItemQ = Id[];

export type RestoreSellQ = Id;

export type UpdateSellF = {
  discount: number;
};

export type AddItemToSellF = {
  item_id: number;
  barcode: boolean;
};

export type UpdateItemInSellF = {
  quantity: number;
};
