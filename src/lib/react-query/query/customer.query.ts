import { useToast } from "@/components/ui/use-toast";
import {
  AddCustomerF,
  AddCustomerQ,
  DeleteCustomerQ,
  GetCustomersQ,
  UpdateCustomerF,
  UpdateCustomerQ,
} from "@/types/customer";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addCustomer,
  deleteCustomer,
  getDeletedCustomer,
  getCustomers,
  restoreCustomer,
  searchDeletedCustomers,
  searchCustomers,
  updateCustomer,
  getCustomersSelection,
} from "../actions/customer.action";
import { QUERY_KEYs } from "../key";
import {
  Filter,
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

export const useGetCustomers = (from: From, to: To) => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.CUSTOMERS],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetCustomersQ>> =>
      getCustomers(toast, pageParam, ENUMs.LIMIT as number, from, to),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
  });
};
export const useGetCustomersSelection = () => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.CUSTOMERS_SELECTION],
    queryFn: () => getCustomersSelection(toast),
    retry: 0,
  });
};
export const useGetDeletedCustomers = (from: From, to: To) => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.DELETED_CUSTOMERS],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetCustomersQ>> =>
      getDeletedCustomer(toast, pageParam, ENUMs.LIMIT as number, from, to),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
  });
};

export const useSearchCustomers = (search: Search) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.SEARCH_CUSTOMERS],
    queryFn: (): Promise<GetCustomersQ> => searchCustomers(toast, search),
    enabled: typeof search === "string" && search.trim() !== "",
    retry: 0,
  });
};
export const useSearchDeletedCustomers = (search: Search) => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.SEARCH_DELETED_CUSTOMERS],
    queryFn: (): Promise<GetCustomersQ> =>
      searchDeletedCustomers(toast, search),
    enabled: typeof search === "string" && search.trim() !== "",
    retry: 0,
  });
};
export const useAddCustomer = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (form: AddCustomerF): Promise<AddCustomerQ> =>
      addCustomer(form),
    onSuccess: (data: AddCustomerQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
        alertType: "success",
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.CUSTOMERS],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
export const useUpdateCustomer = (id: Id) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (form: UpdateCustomerF): Promise<UpdateCustomerQ> =>
      updateCustomer(form, id),
    onSuccess: (data: UpdateCustomerQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
        alertType: "success",
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.CUSTOMERS],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
export const useDeleteCustomer = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { dispatch } = useGlobalContext();

  return useMutation({
    mutationFn: (ids: Id[]): Promise<DeleteCustomerQ> => deleteCustomer(ids),
    onSuccess: (data: DeleteCustomerQ) => {
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
        queryKey: [QUERY_KEYs.SEARCH_CUSTOMERS],
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.CUSTOMERS],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
export const useRestoreCustomer = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { dispatch } = useGlobalContext();

  return useMutation({
    mutationFn: (ids: Id[]): Promise<DeleteCustomerQ> => restoreCustomer(ids),
    onSuccess: (data: DeleteCustomerQ) => {
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
        queryKey: [QUERY_KEYs.SEARCH_DELETED_CUSTOMERS],
      });
      return queryClient.invalidateQueries({
        queryKey: [QUERY_KEYs.DELETED_CUSTOMERS],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
