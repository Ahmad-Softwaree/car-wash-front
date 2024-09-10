import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addExpenseType,
  deleteExpenseType,
  getExpenseTypes,
  updateExpenseType,
} from "../actions/expense-type.action";
import {
  AddExpenseTypeF,
  AddExpenseTypeQ,
  DeleteExpenseTypeQ,
  GetExpenseTypesQ,
  UpdateExpenseTypeF,
  UpdateExpenseTypeQ,
} from "@/types/expense-type";
import { QUERY_KEYs } from "../key";
import { Id, NestError } from "@/types/global";
import { generateNestErrors } from "@/lib/functions";

export const useGetExpenseTypes = () => {
  const { toast } = useToast();
  return useQuery({
    queryKey: [QUERY_KEYs.EXPENSE_TYPES],
    queryFn: (): Promise<GetExpenseTypesQ> => getExpenseTypes(toast),
    retry: 0,
  });
};

export const useAddExpenseType = () => {
  const { toast } = useToast();
  const queryCustomer = useQueryClient();
  return useMutation({
    mutationFn: (form: AddExpenseTypeF): Promise<AddExpenseTypeQ> =>
      addExpenseType(form),
    onSuccess: (data: AddExpenseTypeQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بە سەرکەوتوویی ئەنجامدرا",
      });
      return queryCustomer.invalidateQueries({
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
  const queryCustomer = useQueryClient();
  return useMutation({
    mutationFn: (form: UpdateExpenseTypeF): Promise<UpdateExpenseTypeQ> =>
      updateExpenseType(form, id),
    onSuccess: (data: UpdateExpenseTypeQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بە سەرکەوتوویی ئەنجامدرا",
      });
      return queryCustomer.invalidateQueries({
        queryKey: [QUERY_KEYs.EXPENSE_TYPES],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};

export const useDeleteExpenseType = (id: Id) => {
  const { toast } = useToast();
  const queryCustomer = useQueryClient();
  return useMutation({
    mutationFn: (): Promise<DeleteExpenseTypeQ> => deleteExpenseType(id),
    onSuccess: (data: DeleteExpenseTypeQ) => {
      toast({
        title: "سەرکەوتووبوو",
        description: "کردارەکە بە سەرکەوتوویی ئەنجامدرا",
      });
      return queryCustomer.invalidateQueries({
        queryKey: [QUERY_KEYs.EXPENSE_TYPES],
      });
    },
    onError: (error: NestError) => {
      return generateNestErrors(error, toast);
    },
  });
};
