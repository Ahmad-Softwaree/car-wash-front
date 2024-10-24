import { authApi, blobAuthApi } from "@/lib/config/api.config";
import { generateNestErrors } from "@/lib/functions";
import { URLs } from "@/lib/url";
import { GetBackupsQ } from "@/types/backup";

import {
  Filter,
  From,
  Limit,
  Page,
  PaginationReturnType,
  To,
  ToastType,
} from "@/types/global";
import { QueryClient } from "@tanstack/react-query";
import { QUERY_KEYs } from "../key";

export const getTableNames = async (toast: ToastType): Promise<string[]> => {
  try {
    const { data, status } = await authApi.get<string[]>(
      `${URLs.GET_TABLE_NAMES}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};

export const getBackups = async (
  toast: ToastType,
  page: Page,
  limit: Limit,
  filter: Filter,
  from: From,
  to: To
): Promise<PaginationReturnType<GetBackupsQ>> => {
  try {
    const { data, status } = await authApi.get<
      PaginationReturnType<GetBackupsQ>
    >(
      `${URLs.GET_BACKUPS}?page=${page}&limit=${limit}&filter=${
        filter != "" ? filter : ""
      }&from=${from != "" ? from : ""}&to=${to != "" ? to : ""}`
    );
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const backupEntity = async (
  entityName: string,
  toast: ToastType,
  client: QueryClient
): Promise<Blob> => {
  try {
    const { data, status } = await blobAuthApi.get<Blob>(
      `${URLs.BACKUP}/${entityName}`
    );
    toast({
      title: "سەرکەوتووبووی",
      description: `بەسەرکەوتووی ${entityName} باکئەپ کرد`,
    });
    client.invalidateQueries({
      queryKey: [QUERY_KEYs.BACKUPS],
    });
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
