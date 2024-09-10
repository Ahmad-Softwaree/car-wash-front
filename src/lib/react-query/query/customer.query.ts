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
  useQueryClient,
} from "@tanstack/react-query";
import {
  addCustomer,
  deleteCustomer,
  getCustomers,
  updateCustomer,
} from "../actions/customer.action";
import { QUERY_KEYs } from "../key";
import { Id, NestError, Page, PaginationReturnType } from "@/types/global";
import { ENUMs } from "@/lib/enum";
import { generateNestErrors } from "@/lib/functions";

export const useGetCustomers = () => {
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: [QUERY_KEYs.CLIENTS],
    queryFn: ({
      pageParam,
    }: {
      pageParam: Page;
    }): Promise<PaginationReturnType<GetCustomersQ>> =>
      getCustomers(toast, pageParam, ENUMs.LIMIT as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages: any) => {
      return lastPage.meta?.nextPageUrl ? pages.length + 1 : undefined;
    },
  });
};

export const useAddCustomer = () => {
  const { toast } = useToast();
  const queryCustomer = useQueryClient();

  return useMutation({
    mutationFn: async (form: AddCustomerF): Promise<AddCustomerQ> =>
      addCustomer(form),
    onSuccess: (data: AddCustomerQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
      });
      return queryCustomer.invalidateQueries({
        queryKey: [QUERY_KEYs.CLIENTS],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
export const useUpdateCustomer = (id: Id) => {
  const { toast } = useToast();
  const queryCustomer = useQueryClient();

  return useMutation({
    mutationFn: async (form: UpdateCustomerF): Promise<UpdateCustomerQ> =>
      updateCustomer(form, id),
    onSuccess: (data: UpdateCustomerQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
      });
      return queryCustomer.invalidateQueries({
        queryKey: [QUERY_KEYs.CLIENTS],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
export const useDeleteCustomer = (id: Id) => {
  const { toast } = useToast();
  const queryCustomer = useQueryClient();

  return useMutation({
    mutationFn: (): Promise<DeleteCustomerQ> => deleteCustomer(id),
    onSuccess: (data: DeleteCustomerQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بەسەرکەوتووی ئەنجام درا",
      });
      return queryCustomer.invalidateQueries({
        queryKey: [QUERY_KEYs.CLIENTS],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
