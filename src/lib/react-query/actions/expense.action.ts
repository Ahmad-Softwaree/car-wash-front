import { authApi } from "@/lib/config/api.config";
import { generateNestErrors } from "@/lib/functions";
import { URLs } from "@/lib/url";
import {
  Id,
  Limit,
  Page,
  PaginationReturnType,
  ToastType,
} from "@/types/global";
import {
  AddExpenseF,
  AddExpenseQ,
  GetExpensesQ,
  UpdateExpenseF,
  UpdateExpenseQ,
} from "@/types/expense";

export const getExpenses = async (
  toast: ToastType,
  page: Page,
  limit: Limit
): Promise<PaginationReturnType<GetExpensesQ>> => {
  try {
    const { data, status } = await authApi.get<
      PaginationReturnType<GetExpensesQ>
    >(`${URLs.GET_SPENDS}?page=${page}&limit=${limit}`);
    return data;
  } catch (error: any) {
    throw generateNestErrors(error, toast);
  }
};
export const addExpense = async (form: AddExpenseF): Promise<AddExpenseQ> => {
  try {
    const { data, status } = await authApi.post<AddExpenseQ>(
      URLs.ADD_SPEND,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
export const updateExpense = async (
  form: UpdateExpenseF,
  id: Id
): Promise<UpdateExpenseQ> => {
  try {
    const { data, status } = await authApi.put<UpdateExpenseQ>(
      `${URLs.UPDATE_SPEND}/${id}`,
      form
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};
