import { Id } from "./global";

export type Backup = {
  id: Id;
  table: string;
  user_name: string;
  user_id: Id;
  user_role: string;
  created_at: Date | null;
  updated_at: Date | null;
};

export type GetBackupsQ = Backup[];

export type BackupCardProps = Backup & { index?: number };
