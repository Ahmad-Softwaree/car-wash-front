import { Id } from "./global";

export type GetCarTypesQ = CarType[];

export type CarType = {
  name: string;
  id: Id;
};

export type CarTypeCardProps = CarType & { index?: number };

export type AddCarTypeInputs = {
  name: string;
};

export type AddCarTypeF = AddCarTypeInputs;

export type UpdateCarTypeF = AddCarTypeInputs;
export type AddCarTypeQ = CarType;

export type UpdateCarTypeQ = CarType;

export type DeleteCarTypeQ = Id[];
