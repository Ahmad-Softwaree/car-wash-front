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

export type VultrBackup = {
  id: Id;
  description: string;
  size: number;
  status: string;
  od_id: number;
  app_id: number;
  date_created: Date | null;
};

export type GetVultrBackupsQ = VultrBackup[];

export type VultrBackupCardProps = VultrBackup & { index?: number };
