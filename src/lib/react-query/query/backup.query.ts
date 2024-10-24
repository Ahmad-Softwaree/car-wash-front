import { useToast } from "@/components/ui/use-toast";

import {
  QueryClient,
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  backupEntity,
  getBackups,
  getTableNames,
} from "../actions/backup.action";
import { QUERY_KEYs } from "../key";
import { Filter, From, Page, PaginationReturnType, To } from "@/types/global";
import { ENUMs } from "@/lib/enum";
import { GetBackupsQ } from "@/types/backup";

export const useGetTableNames = () => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.TABLE_NAMES],
    queryFn: (): Promise<string[]> => getTableNames(toast),
    retry: 0,
  });
};

export const useGetBackups = (filter: Filter, from: From, to: To) => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.BACKUPS],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetBackupsQ>> =>
      getBackups(toast, pageParam, ENUMs.LIMIT as number, filter, from, to),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
    retry: 0,
  });
};

export const useBackupEntity = (entityName: string) => {
  const { toast } = useToast();
  const queryClient: QueryClient = useQueryClient();
  return useQuery({
    queryKey: [QUERY_KEYs.BACKUP],
    queryFn: (): Promise<Blob> => backupEntity(entityName, toast, queryClient),
    enabled: false,
    retry: 0,
  });
};
