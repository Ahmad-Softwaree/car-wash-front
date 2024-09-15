import {
  Id,
  ImageTypeInDatabase,
  ImageTypeInForm,
  MaybeImageTypeInDatabase,
} from "./global";

export type ItemCard = {
  id: Id;
  image_url: string;
  image_name: string;
  name: string;
  quantity: number;
  actual_quantity: number;
};
export type ItemInformation = {
  barcode: string;
  type_name: string;
  type_id: number;
  item_purchase_price: number;
  item_sell_price: number;
  note: string;
};

export type ItemLess = ItemCard & {};
export type LessItemCardProps = ItemCard & {};

export type PsulaItemCardProps = ItemCard &
  ItemInformation & {
    onClick: (id: Id) => void;
  };
export type Item = ItemCard & ItemInformation;

export type AddItemCardProps = ItemCard & {
  onClick: (id: Id) => void;
};
export type ItemCardProps = ItemCard & ItemInformation & { index?: number };
export type MostItemCardProps = Item;
export type AddItemInputs = {
  name: string;
  barcode: string;
  type_id: number;
  quantity: number;
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

export type AddItemQ = Item;
export type UpdateItemQ = Item;

export type CountItemQ = Item;
export type DeleteItemQ = Id[];

export type GetItemByIdQ = Item | null | undefined;

export type GetItemsInAddQ = ItemInformation[];
export type GetItemsLessQ = ItemLess[];
