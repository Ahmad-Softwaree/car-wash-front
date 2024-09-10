import { useToast } from "@/components/ui/use-toast";
import {
  AddExpenseF,
  AddExpenseQ,
  GetExpensesQ,
  UpdateExpenseF,
  UpdateExpenseQ,
} from "@/types/expense";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { QUERY_KEYs } from "../key";
import {
  addExpense,
  getExpenses,
  updateExpense,
} from "../actions/expense.action";
import { Id, NestError, Page, PaginationReturnType } from "@/types/global";
import { ENUMs } from "@/lib/enum";
import { generateNestErrors } from "@/lib/functions";

export const useGetExpenses = () => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.SPENDS],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetExpensesQ>> =>
      getExpenses(toast, pageParam, ENUMs.LIMIT as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
  });
};
export const useAddExpense = () => {
  const { toast } = useToast();
  const queryCustomer = useQueryClient();

  return useMutation({
    mutationFn: (form: AddExpenseF) => addExpense(form),
    onSuccess: (data: AddExpenseQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
      });
      return queryCustomer.invalidateQueries({
        queryKey: [QUERY_KEYs.SPENDS],
      });
    },
    onError: (error: NestError) => {
      throw generateNestErrors(error, toast);
    },
  });
};
export const useUpdateExpense = (id: Id) => {
  const { toast } = useToast();
  const queryCustomer = useQueryClient();

  return useMutation({
    mutationFn: (form: UpdateExpenseF) => updateExpense(form, id),
    onSuccess: (data: UpdateExpenseQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
      });
      return queryCustomer.invalidateQueries({
        queryKey: [QUERY_KEYs.SPENDS],
      });
    },
    onError: (error: NestError) => {
      throw generateNestErrors(error, toast);
    },
  });
};
