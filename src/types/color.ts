import { Id } from "./global";

export type GetColorsQ = Color[];

export type Color = {
  name: string;
  id: Id;
};

export type ColorCardProps = Color;

export type AddColorInputs = {
  name: string;
};

export type AddColorF = AddColorInputs;

export type UpdateColorF = AddColorInputs;
export type AddColorQ = Color;

export type UpdateColorQ = Color;

export type DeleteColorQ = Id;
