import { Id } from "./global";

export type Config = {
  id: Id;
  item_less_from: number;
  created_at: Date | null;
  updated_at: Date | null;
};

export type GetConfigsQ = Config;
export type UpdateConfigQ = Config;

export type ConfigCardProps = Config;
