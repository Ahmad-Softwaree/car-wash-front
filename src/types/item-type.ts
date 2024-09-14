import { Id } from "./global";

export type GetItemTypesQ = ItemType[];

export type ItemType = {
  name: string;
  id: Id;
};

export type ItemTypeCardProps = ItemType & { index?: number };

export type AddItemTypeInputs = {
  name: string;
};

export type AddItemTypeF = AddItemTypeInputs;

export type UpdateItemTypeF = AddItemTypeInputs;
export type AddItemTypeQ = ItemType;

export type UpdateItemTypeQ = ItemType;

export type DeleteItemTypeQ = Id[];
