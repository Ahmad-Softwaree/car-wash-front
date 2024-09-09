import { useToast } from "@/components/ui/use-toast";
import {
  AddSpendF,
  AddSpendQ,
  GetSpendsQ,
  UpdateSpendF,
  UpdateSpendQ,
} from "@/types/spend";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { QUERY_KEYs } from "../key";
import { addSpend, getSpends, updateSpend } from "../actions/spend.action";
import { Id, NestError, Page, PaginationReturnType } from "@/types/global";
import { ENUMs } from "@/lib/enum";
import { generateNestErrors } from "@/lib/functions";

export const useGetSpends = () => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.SPENDS],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetSpendsQ>> =>
      getSpends(toast, pageParam, ENUMs.LIMIT as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
  });
};
export const useAddSpend = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (form: AddSpendF) => addSpend(form),
    onSuccess: (data: AddSpendQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.SPENDS],
      });
    },
    onError: (error: NestError) => {
      throw generateNestErrors(error, toast);
    },
  });
};
export const useUpdateSpend = (id: Id) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (form: UpdateSpendF) => updateSpend(form, id),
    onSuccess: (data: UpdateSpendQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.SPENDS],
      });
    },
    onError: (error: NestError) => {
      throw generateNestErrors(error, toast);
    },
  });
};
