import {
  Id,
  ImageTypeInDatabase,
  ImageTypeInForm,
  MaybeImageTypeInDatabase,
} from "./global";
import { Sell, SellItem } from "./sell";

export type ItemCard = {
  id: Id;
  image_url: string;
  image_name: string;
  name: string;
  quantity: number;
  actual_quantity: number;
  created_by: string;
  updated_by: string;
};
export type ItemInformation = {
  barcode: string;
  type_name: string;
  type_id: number;
  item_purchase_price: number;
  item_sell_price: number;
  note: string;
};

export type PsulaItemCardProps = ItemCard &
  ItemInformation & {
    onClick: (id: Id) => void;
  };
export type Item = ItemCard & ItemInformation;

export type AddItemCardProps = ItemCard & {
  onClick: (id: Id) => void;
};
export type ItemCardProps = ItemCard & ItemInformation & { index?: number };
export type AddItemInputs = {
  name: string;
  barcode: string;
  type_id: number;
  quantity?: number;
  item_purchase_price: number;
  item_sell_price: number;
  note: string;
};

export type AddItemF = AddItemInputs & ImageTypeInForm;

export type AddItemWithFirebaseImage = AddItemInputs & ImageTypeInDatabase;
export type UpdateItemWithFirebaseImage = AddItemInputs &
  MaybeImageTypeInDatabase;

export type CountItemF = {
  count: number;
};
export type UpdateItemF = AddItemInputs &
  ImageTypeInForm & {
    old_image_url?: string;
    old_image_name?: string;
  };

export type GetItemsQ = Item[];

export type ItemReport = Item &
  SellItem &
  Sell & { index?: number; total_quantity?: number | string };

export type ItemKoga = Item &
  SellItem &
  Sell & { index?: number; total_quantity?: number | string };

export type ItemProfit = Item &
  SellItem &
  Sell & { index?: number; total_quantity?: number | string };

export type ItemSellReportCardProps = ItemReport;

export type ItemProfitReportCardProps = ItemProfit;

export type ItemKogaReportCardProps = ItemKoga;

export type GetItemsReportQ = ItemReport[];

export type AddItemQ = Item;
export type UpdateItemQ = Item;

export type CountItemQ = Item;
export type DeleteItemQ = Id[];

export type GetItemByIdQ = Item | null | undefined;

export type GetItemsInAddQ = ItemInformation[];

export type ItemQuantityHistory = {
  id: number;
  created_by: string;
  item_id: number;
  item_name: string;
  item_barcode: string;
  type_id: number;
  type_name: string;
  quantity: number;
  item_purchase_price: number;
  item_sell_price: number;
  created_at: Date;
  updated_at: Date;
};

export type GetItemQuantityHistoriesReportQ = ItemQuantityHistory[];

export type ItemMovementProps = ItemQuantityHistory & { index?: number };
