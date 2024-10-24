import { Id } from "./global";

export type GetServicesQ = Service[];

export type Service = {
  name: string;
  price: number;
  id: Id;
};

export type ServiceCardProps = Service & { index?: number };

export type AddServiceInputs = {
  name: string;
  price: number;
};

export type AddServiceF = AddServiceInputs;

export type UpdateServiceF = AddServiceInputs;
export type AddServiceQ = Service;

export type UpdateServiceQ = Service;

export type DeleteServiceQ = Id[];
