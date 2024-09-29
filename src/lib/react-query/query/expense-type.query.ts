import { useToast } from "@/components/ui/use-toast";
import {
  AddExpenseTypeF,
  AddExpenseTypeQ,
  DeleteExpenseTypeQ,
  GetExpenseTypesQ,
  UpdateExpenseTypeF,
  UpdateExpenseTypeQ,
} from "@/types/expense-type";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addExpenseType,
  deleteExpenseType,
  getDeletedExpenseType,
  getExpenseTypes,
  getExpenseTypesSelection,
  restoreExpenseType,
  searchDeletedExpenseTypes,
  searchExpenseTypes,
  updateExpenseType,
} from "../actions/expense-type.action";
import { QUERY_KEYs } from "../key";
import {
  From,
  Id,
  NestError,
  Page,
  PaginationReturnType,
  Search,
  To,
} from "@/types/global";
import { ENUMs } from "@/lib/enum";
import { generateNestErrors } from "@/lib/functions";
import { useGlobalContext } from "@/context/GlobalContext";
import { CONTEXT_TYPEs } from "@/context/types";

export const useGetExpenseTypes = (from: From, to: To) => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.EXPENSE_TYPES],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetExpenseTypesQ>> =>
      getExpenseTypes(toast, pageParam, ENUMs.LIMIT as number, from, to),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
  });
};
export const useGetExpenseTypesSelection = () => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.EXPENSE_TYPES_SELECTION],
    queryFn: () => getExpenseTypesSelection(toast),
    retry: 0,
  });
};
export const useGetDeletedExpenseTypes = (from: From, to: To) => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.DELETED_EXPENSE_TYPES],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetExpenseTypesQ>> =>
      getDeletedExpenseType(toast, pageParam, ENUMs.LIMIT as number, from, to),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
  });
};

export const useSearchExpenseTypes = (search: Search) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.SEARCH_EXPENSE_TYPES],
    queryFn: (): Promise<GetExpenseTypesQ> => searchExpenseTypes(toast, search),
    enabled: !!search,
    retry: 0,
  });
};
export const useSearchDeletedExpenseTypes = (search: Search) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.SEARCH_DELETED_EXPENSE_TYPES],
    queryFn: (): Promise<GetExpenseTypesQ> =>
      searchDeletedExpenseTypes(toast, search),
    enabled: !!search,
    retry: 0,
  });
};
export const useAddExpenseType = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (form: AddExpenseTypeF): Promise<AddExpenseTypeQ> =>
      addExpenseType(form),
    onSuccess: (data: AddExpenseTypeQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
        alertType: "success",
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.EXPENSE_TYPES_SELECTION],
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.EXPENSE_TYPES],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
export const useUpdateExpenseType = (id: Id) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (form: UpdateExpenseTypeF): Promise<UpdateExpenseTypeQ> =>
      updateExpenseType(form, id),
    onSuccess: (data: UpdateExpenseTypeQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
        alertType: "success",
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.EXPENSE_TYPES],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
export const useDeleteExpenseType = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { dispatch } = useGlobalContext();

  return useMutation({
    mutationFn: (ids: Id[]): Promise<DeleteExpenseTypeQ> =>
      deleteExpenseType(ids),
    onSuccess: (data: DeleteExpenseTypeQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
        alertType: "success",
      });
      dispatch({
        type: CONTEXT_TYPEs.CHECK,
        payload: [],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.SEARCH_EXPENSE_TYPES],
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.EXPENSE_TYPES],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
export const useRestoreExpenseType = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { dispatch } = useGlobalContext();

  return useMutation({
    mutationFn: (ids: Id[]): Promise<DeleteExpenseTypeQ> =>
      restoreExpenseType(ids),
    onSuccess: (data: DeleteExpenseTypeQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
        alertType: "success",
      });
      dispatch({
        type: CONTEXT_TYPEs.CHECK,
        payload: [],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.SEARCH_DELETED_EXPENSE_TYPES],
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.DELETED_EXPENSE_TYPES],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
