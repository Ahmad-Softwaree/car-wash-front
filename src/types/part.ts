import { Id } from "./global";

export type GetPartsQ = Part[];

export type Part = {
  name: string;
  id: Id;
};

export type PartCardProps = Part;

export type AddPartInputs = {
  name: string;
};

export type AddPartF = AddPartInputs;

export type UpdatePartF = AddPartInputs;

export type AddPartQ = Part;

export type UpdatePartQ = Part;

export type DeletePartQ = Id;
