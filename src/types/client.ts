import {
  Id,
  ImageTypeInDatabase,
  ImageTypeInForm,
  MaybeImageTypeInDatabase,
} from "./global";

export type Client = {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  phone1: string | null;
  city_id: number | null;
  city_name: string;
  street: string | null;
  image_name: string | null;
  image_url: string | null;
  created_at: Date | null;
  updated_at: Date | null;
  deleted: boolean;
};

export type ClientCardProps = Client;
export type AddClientInputs = {
  phone?: string;
  phone1?: string;
  first_name: string;
  street: string;
  last_name: string;
  city_id?: Id;
};

export type AddClientF = AddClientInputs & ImageTypeInForm;
export type AddClientWithFirebaseImage = AddClientInputs & ImageTypeInDatabase;
export type UpdateClientF = AddClientInputs &
  ImageTypeInForm & {
    old_image_url?: string;
    old_image_name?: string;
  };
export type UpdateClientWithFirebaseImage = AddClientInputs &
  MaybeImageTypeInDatabase;

export type GetClientsQ = Client[];
export type AddClientQ = Client;
export type DeleteClientQ = Client;

export type UpdateClientQ = Client;
