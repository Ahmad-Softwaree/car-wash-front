import { Id } from "./global";

export type GetCarModelsQ = CarModel[];

export type CarModel = {
  name: string;
  id: Id;
};

export type CarModelCardProps = CarModel;

export type AddCarModelInputs = {
  name: string;
};

export type AddCarModelF = AddCarModelInputs;

export type UpdateCarModelF = AddCarModelInputs;
export type AddCarModelQ = CarModel;

export type UpdateCarModelQ = CarModel;

export type DeleteCarModelQ = Id;
