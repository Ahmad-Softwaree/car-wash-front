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
