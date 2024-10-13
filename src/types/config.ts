export type Config = {
  id: number;
  item_less_from: number;
  initial_money: number;
  items_print_modal: boolean;
  pos_print_modal: boolean;
  report_print_modal: boolean;
  created_at: Date | null;
  updated_at: Date | null;
};

export type GetConfigsQ = Config;
export type UpdateConfigQ = Config;

export type ConfigCardProps = Config;
