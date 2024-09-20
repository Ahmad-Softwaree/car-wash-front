import { useToast } from "@/components/ui/use-toast";

import {
  QueryClient,
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { backupEntity, getBackups } from "../actions/backup.action";
import { QUERY_KEYs } from "../key";
import { From, Page, PaginationReturnType, To } from "@/types/global";
import { ENUMs } from "@/lib/enum";
import { GetBackupsQ } from "@/types/backup";

export const useGetBackups = (from: From, to: To) => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.BACKUPS],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetBackupsQ>> =>
      getBackups(toast, pageParam, ENUMs.LIMIT as number, from, to),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
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
