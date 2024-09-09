import { Id } from "./global";

export type GetServicesQ = Service[];

export type Service = {
  name: string;
  id: Id;
};

export type ServiceCardProps = Service;

export type AddServiceInputs = {
  name: string;
};

export type AddServiceF = AddServiceInputs;

export type UpdateServiceF = AddServiceInputs;
export type AddServiceQ = Service;

export type UpdateServiceQ = Service;

export type DeleteServiceQ = Id;
