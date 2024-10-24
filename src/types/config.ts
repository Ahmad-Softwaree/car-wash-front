export type Config = {
  id: number;
  item_less_from: number;
  initial_money: number;

  created_at: Date | null;
  updated_at: Date | null;
};

export type GetConfigsQ = Config;
export type UpdateConfigQ = Config;

export type ConfigCardProps = Config;

export type CompanyInfo = {
  id: number;
  phone: string;
  phone1: string;
  name: string;
  location: string;
  description: string;
  image_name: string;
  image_url: string;
  deleted: boolean;
  created_at: Date | null;
  updated_at: Date | null;
};

export type CompanyInfoForm = {
  phone?: string;
  phone1?: string;
  name?: string;
  location?: string;
  description?: string;
};
export type CompanyImageFrom = {
  image: FileList;
};
export type CompanyImageFromF = {
  image_name: string;
  image_url: string;
};
